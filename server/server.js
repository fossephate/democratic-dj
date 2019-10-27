const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8099;
const config = require("./config.js");

const Client = require("./client.js").Client;
const Party = require("./client.js").Party;

const session = require("express-session");
let SpotifyWebApi = require("spotify-web-api-node");

const SESSION_SECRET = config.SESSION_SECRET;

app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(express.static("public"));

server.listen(port, () => {
	console.log("server listening at port %d", port);
});

// misc:
function generatePartyIdentifier() {
	let sizeOfString = 4;
	let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
	let identifier = "";
	for (let counter = 0; counter < sizeOfString; counter++) {
		identifier += charset[Math.floor(Math.random() * charset.length)];
	}
	return identifier;
}

let spotifyApi = new SpotifyWebApi({
	clientId: "9c4e8aa5d56847059632fb4d8323ccd7",
	clientSecret: "9f2ddb790efa4402997be72366ef6c7f",
});

function getAndRefreshToken() {
	// Retrieve an access token
	spotifyApi.clientCredentialsGrant().then(
		(data) => {
			console.log("The access token expires in " + data.body["expires_in"]);
			console.log("The access token is " + data.body["access_token"]);

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body["access_token"]);
		},
		(error) => {
			console.log("Something went wrong when retrieving an access token", error.message);
		},
	);
}

setInterval(getAndRefreshToken, 1000 * 60 * 55);
getAndRefreshToken();

let parties = {};

let clients = {};

io.on("connection", (socket) => {
	clients[socket.id] = new Client(socket.id);
	console.log(`#clients: ${Object.keys(clients).length}`);

	socket.on("createRoom", (data, cb) => {
		if (!clients[socket.id]) {
			console.log("client doesn't exist for some reason");
			cb({ success: false, reason: "client doesn't exist" });
			return;
		}

		// todo: ensure no conflicts:
		let roomName = generatePartyIdentifier();

		socket.join(roomName);
		clients[socket.id].isHost = true;
		clients[socket.id].roomName = roomName;

		parties[roomName] = new Party(socket.id, roomName);

		cb({
			success: true,
			roomName: roomName,
		});
	});

	socket.on("joinRoom", (data, cb) => {
		let client = clients[socket.id];
		if (!client) {
			console.log("client doesn't exist for some reason");
			cb({ success: false, reason: "client doesn't exist" });
			return;
		}

		let party = parties[data.roomName];

		if (!party) {
			console.log("party not found!");
			cb({ success: false, reason: "party not found!" });
			return;
		}

		if (parties[data.roomName].usernames.indexOf(data.username) > -1) {
			console.log("username in use!");
			cb({ success: false, reason: "username in use!" });
			return;
		}

		parties[data.roomName].usernames.push(data.username);
		socket.join(data.roomName);
		clients[socket.id].roomName = data.roomName;
		clients[socket.id].username = data.username;

		cb({
			success: true,
		});
	});

	socket.on("vote", (data, cb) => {
		let client = clients[socket.id];
		if (!client) {
			console.log("client doesn't exist for some reason");
			cb({ success: false, reason: "client doesn't exist" });
			return;
		}

		if (!client.roomName) {
			console.log("client not in a room for some reason");
			cb({ success: false, reason: "client not in a room for some reason" });
			return;
		}

		let party = parties[client.roomName];

		if (!party) {
			console.log("party not found!");
			cb({ success: false, reason: "party not found!" });
			return;
		}

		let index = null;
		for (let i = 0; i < party.songList.length; i++) {
			if (party.songList[i].songName === data.songName) {
				index = i;
				break;
			}
		}
		if (index === null) {
			console.log("song not found!");
			cb({ success: false, reason: "song not found!" });
			return;
		}

		parties[client.roomName].songList[index].vote(
			data.type,
			client.username,
			client.socketid,
		);

		cb({ success: true });
	});

	socket.on("submitSong", (data, cb) => {
		let client = clients[socket.id];
		if (!client) {
			console.log("client doesn't exist for some reason");
			cb({ success: false, reason: "client doesn't exist" });
			return;
		}

		if (!client.roomName) {
			console.log("client not in a room for some reason");
			cb({ success: false, reason: "client not in a room for some reason" });
			return;
		}

		let party = parties[clients[socket.id].roomName];

		if (!party) {
			console.log("party not found!");
			cb({ success: false, reason: "party not found!" });
			return;
		}

		if (client.songsSubmitted >= party.songSubmissionLimit) {
			cb({ success: false, reason: "submission limit reached!" });
			return;
		}

		clients[socket.id].songsSubmitted += 1;

		parties[clients[socket.id].roomName].submitSong(socket.id, client.username, {
			...data.songData,
		});

		cb({ success: true });
	});

	socket.on("searchSong", (data, cb) => {
		let client = clients[socket.id];
		if (!client) {
			console.log("client doesn't exist for some reason");
			cb({ success: false, reason: "client doesn't exist" });
			return;
		}

		if (data.songName === "") {
			cb({ success: false, reason: "empty song" });
			return;
		}

		spotifyApi
			.searchTracks(data.songName)
			.then((res) => {
				let songs = res.body.tracks.items;
				let items = [];

				for (let i = 0; i < songs.length; i++) {
					let item = {
						songName: songs[i].name,
						album: songs[i].album,
						// albumName: songs[i].name,
						// images: songs[i].images,
						uri: songs[i].uri,
					};
					items.push(item);
				}
				cb({ success: true, searchResults: items });
			})
			.catch((error) => {
				console.log("promise rejected");
				console.log(error);
			});
	});

	socket.on("createPlaylist", (data, cb) => {
		let client = clients[socket.id];
		if (!client) {
			console.log("client doesn't exist for some reason");
			cb({ success: false, reason: "client doesn't exist" });
			return;
		}

		if (!client.roomName) {
			console.log("client not in a room for some reason");
			cb({ success: false, reason: "client not in a room for some reason" });
			return;
		}

		let party = parties[clients[socket.id].roomName];

		if (!party) {
			console.log("party not found!");
			cb({ success: false, reason: "party not found!" });
			return;
		}

		let tracks = [];
		for (let i = 0; i < party.songList.length; i++) {
			let song = party.songList[i];
			tracks.push(song.songData.uri);
		}

		// spotifyApi
		// 	.createPlaylist("parth04", "HackGT Playlist Demo v." + Math.random())
		// 	.then((data) => {
		// 		console.log("playlist created!");
		// 		let playlistId = data.body["id"];

		// 		spotifyApi
		// 			.addTracksToPlaylist(playlistId, tracks)
		// 			.then((data) => {
		// 				cb({ success: true, playlist: data });
		// 			})
		// 			.catch((error) => {
		// 				console.log("promise rejected1");
		// 				console.log(error);
		// 			});
		// 	})
		// 	.catch((error) => {
		// 		console.log("promise rejected2");
		// 		console.log(error);
		// 	});
	});

	socket.on("disconnect", (data) => {
		let client = clients[socket.id];

		if (client) {
			// this.accountServerConnection.emit("clientDisconnected", {
			// 	socketid: socket.id,
			// 	userid: client.userid,
			// 	timePlayed: client.timePlayed,
			// });
			// delete:
			delete clients[socket.id];
		}
		console.log(`#clients: ${Object.keys(clients).length}`);
	});
});

// loop through all the parties and count all the votes
// also send out updates to all connected users:
setInterval(() => {
	for (let roomName in parties) {
		let party = parties[roomName];

		// todo: count votes:

		party.tallyVotes();

		let songList = [];
		for (let i = 0; i < party.songList.length; i++) {
			let song = party.songList[i];
			songList.push({
				socketid: song.socketid,
				username: song.username,
				upvotes: song.upvotes,
				votes: song.votes,
				...song.songData,
			});
		}

		io.to(roomName).emit("songList", { songList: songList });
	}
}, 200);
