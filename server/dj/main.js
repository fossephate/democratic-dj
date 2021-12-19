const port = 8001;
const socketio = require("socket.io");
// let io = socketio({
// 	transports: ["polling", "websocket", "xhr-polling", "jsonp-polling"],
// });
const config = require("./config.js");

// yt express stuff:
const stream = require("youtube-audio-stream");
const fs = require("fs");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
let io = socketio(server);
app.use(express.static(__dirname + "/public"));

const Client = require("./client.js").Client;
const Party = require("./client.js").Party;
let SpotifyWebApi = require("spotify-web-api-node");

// redis:
const bluebird = require("bluebird");
const redis = require("redis");
bluebird.promisifyAll(redis);
let redisClient = redis.createClient({ host: "localhost", port: 6379 });

// io.listen(port, () => {
server.listen(port, () => {
	console.log("server listening at port %d", port);
});

// misc:
function generatePartyIdentifier() {
	let sizeOfString = 5;
	let charset = "ABCDEFGHJKLMNPQRTUVWXY346789";
	let identifier = "";
	for (let i = 0; i < sizeOfString; i++) {
		identifier += charset[Math.floor(Math.random() * charset.length)];
	}
	return identifier;
}

let chunkifyArray = (array, chunk_size) =>
	Array(Math.ceil(array.length / chunk_size))
		.fill()
		.map((_, index) => index * chunk_size)
		.map((begin) => array.slice(begin, begin + chunk_size));

let spotifyApi = new SpotifyWebApi({
	clientId: config.SPOTIFY_CLIENT_ID,
	clientSecret: config.SPOTIFY_CLIENT_SECRET,
});

function getAndRefreshToken() {
	// Retrieve an access token
	spotifyApi.clientCredentialsGrant().then(
		(data) => {
			console.log("The access token expires in " + data.body.expires_in);
			console.log("The access token is " + data.body.access_token);

			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body.access_token);
			spotifyApi.setRefreshToken(data.body.refresh_token);
		},
		(error) => {
			console.log("Something went wrong when retrieving an access token", error.message);
		},
	);
}

setInterval(getAndRefreshToken, 1000 * 60 * 55);
getAndRefreshToken();

function refreshTokenIfNecessary(client, userSpotifyApi, cb) {
	if (client.tokenExpiration !== null && client.accessToken && client.refreshToken) {
		if (client.tokenExpiration - new Date().getTime() / 1000 > 100) {
			userSpotifyApi.setAccessToken(client.accessToken);
			userSpotifyApi.setRefreshToken(client.refreshToken);

			cb({ success: true, client: client });
			return;
		} else {
			// refresh the token:
			userSpotifyApi.setAccessToken(client.accessToken);
			userSpotifyApi.setRefreshToken(client.refreshToken);
			userSpotifyApi
				.refreshAccessToken()
				.then((spotify_data) => {
					userSpotifyApi.setAccessToken(spotify_data.body.access_token);
					userSpotifyApi.setRefreshToken(spotify_data.body.refresh_token);
					client.accessToken = spotify_data.body.access_token;
					client.refreshToken = spotify_data.body.refresh_token;
					client.tokenExpiration =
						new Date().getTime() / 1000 + spotify_data.body.expires_in;
					cb({ success: true, client: client });
					return;
				})
				.catch((error) => {
					cb({ success: false, reason: `couldn't refresh token: ${error}` });
					return;
				});
		}
	} else if (client.code) {
		userSpotifyApi
			.authorizationCodeGrant(client.code)
			.then((spotify_data) => {
				userSpotifyApi.setAccessToken(spotify_data.body.access_token);
				userSpotifyApi.setRefreshToken(spotify_data.body.refresh_token);
				client.accessToken = spotify_data.body.access_token;
				client.refreshToken = spotify_data.body.refresh_token;
				client.tokenExpiration =
					new Date().getTime() / 1000 + spotify_data.body.expires_in;

				cb({ success: true, client: client });
			})
			.catch((error) => {
				cb({ success: false, reason: `couldn't authorize token: ${error}` });
				return;
			});
	} else {
		cb({ success: false, reason: "no client code provided!" });
		return;
	}
}

// app.get("/login", (req, res) => {
// 	let scopes = "user-read-private user-read-email";
// 	res.redirect(
// 		"https://accounts.spotify.com/authorize" +
// 			"?response_type=code" +
// 			"&client_id=" +
// 			config.SPOTIFY_CLIENT_ID +
// 			(scopes ? `&scope=${encodeURIComponent(scopes)}` : "") +
// 			"&redirect_uri=" +
// 			encodeURIComponent(config.SPOTIFY_REDIRECT_URI),
// 	);
// });
// console.log("@@@@@@@@@@@@@");
// let scopes =
// 	"playlist-modify-private user-read-private user-read-email playlist-read-collaborative user-modify-playback-state playlist-modify-public playlist-read-private";
// let redirect_uri = "https://fosse.co/callback";
// let link =
// 	"https://accounts.spotify.com/authorize" +
// 	"?response_type=code" +
// 	"&client_id=" +
// 	config.SPOTIFY_CLIENT_ID +
// 	(scopes ? `&scope=${encodeURIComponent(scopes)}` : "") +
// 	"&redirect_uri=" +
// 	encodeURIComponent(redirect_uri);
// console.log(link);
// console.log("@@@@@@@@@@@@@");

// app.get("/*", (req, res) => {
// 	// console.log("aaa");
// 	// let scopes = "user-read-private user-read-email";
// 	// res.redirect(
// 	// 	"https://accounts.spotify.com/authorize" +
// 	// 		"?response_type=code" +
// 	// 		"&client_id=" +
// 	// 		config.SPOTIFY_CLIENT_ID +
// 	// 		(scopes ? `&scope=${encodeURIComponent(scopes)}` : "") +
// 	// 		"&redirect_uri=" +
// 	// 		encodeURIComponent(config.SPOTIFY_REDIRECT_URI),
// 	// );

// 	// console.log(req.url);
// 	// console.log(req.url.slice(1));

// 	let slicedUrl = "youtube.com/watch?v=ZjQK6GzZD-w";

// 	// stream(req.url.slice(1)).pipe(res);
// 	stream(slicedUrl).pipe(res);
// });

// app.get("/", function(req, res, next) {
// 	res.sendFile(__dirname + "/index.html");
// });

let parties = {};

let clients = {};

function saveParties() {
	// stringify:
	let databaseString = JSON.stringify(parties);
	// store back in database:
	// store account at uniqueID location, at clients key:
	redisClient.setAsync("DDJParties", databaseString).then((success) => {
		console.log(`stored database: ${success}`);
	});
}

// get existing DB:
setTimeout(() => {
	redisClient.getAsync("DDJParties").then((savedDB) => {
		let database;
		if (savedDB === null) {
			console.log("Creating party DB.");
			database = {};
		} else {
			database = JSON.parse(savedDB);
		}

		for (let key in database) {
			let dbParty = database[key];
			parties[key] = new Party();
			parties[key].recreateFromJSON(dbParty);
			parties[key].recreateSongList(spotifyApi);
		}

		saveParties();
	});
}, 1000);
setInterval(() => {
	saveParties();
}, 1000 * 60);

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

		data.username = data.username.toLowerCase().trim();

		if (parties[data.roomName].usernames.indexOf(data.username) > -1) {
			// console.log("username in use!");
			for (let sid in clients) {
				let c = clients[sid];
				if (c.username === data.username && sid !== socket.id) {
					clients[socket.id].accessToken = c.accessToken;
					clients[socket.id].refreshToken = c.refreshToken;
					clients[socket.id].tokenExpiration = c.tokenExpiration;
					clients[socket.id].code = c.code;

					// try {
					// 	io.sockets.connected[sid].disconnect();
					// } catch (error) {
					// 	console.log("disconnect failed?: " + error);
					// 	// console.log(io.sockets.connected);
					// }
					delete clients[sid];
				}
			}
		} else {
			parties[data.roomName].usernames.push(data.username);
		}

		socket.join(data.roomName);
		clients[socket.id].roomName = data.roomName;
		clients[socket.id].username = data.username;

		cb({
			success: true,
		});

		setTimeout(() => {
			if (parties[data.roomName].previousSongListJSON) {
				socket.emit("songList", {
					songList: JSON.parse(parties[data.roomName].previousSongListJSON),
				});
			}
		}, 500);
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

		let party = parties[client.roomName];

		if (!party) {
			console.log("party not found!");
			cb({ success: false, reason: "party not found!" });
			return;
		}

		if (party.submissionCounts[client.username]) {
			// if (party.submissionCounts[client.username] >= party.songSubmissionLimit) {
			// 	cb({ success: false, reason: "submission limit reached!" });
			// 	return;
			// } else {
			// 	parties[client.roomName].submissionCounts[client.username] += 1;
			// }
			parties[client.roomName].submissionCounts[client.username] += 1;
		} else {
			parties[client.roomName].submissionCounts[client.username] = 1;
		}

		for (let i = 0; i < party.songList.length; i++) {
			let song = party.songList[i];
			if (data.songData.songName === song.songName) {
				cb({ success: false, reason: "song is already in the list!" });
				return;
			}
		}

		parties[clients[socket.id].roomName].submitSong(socket.id, client.username, {
			...data.songData,
		});

		cb({ success: true });
	});

	socket.on("removeSong", (data, cb) => {
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

		parties[client.roomName].songList.splice(index, 1);

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
						uri: songs[i].uri,
						preview_url: songs[i].preview_url,
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

	socket.on("verifyToken", (data, cb) => {
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

		if (data.code) {
			client.code = data.code;
		}

		let userSpotifyApi = new SpotifyWebApi({
			clientId: config.SPOTIFY_CLIENT_ID,
			clientSecret: config.SPOTIFY_CLIENT_SECRET,
			redirectUri: config.SPOTIFY_REDIRECT_URI,
		});

		refreshTokenIfNecessary(client, userSpotifyApi, (error_data) => {
			if (error_data.success) {
				clients[socket.id].accessToken = error_data.client.accessToken;
				clients[socket.id].refreshToken = error_data.client.refreshToken;
			}
			cb(error_data);
			return;
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

		// we can only add ~30 songs to a playlist at a time?:
		let chunkifiedTracks = chunkifyArray(tracks, 30);

		if (data.code) {
			client.code = data.code;
		}

		let userSpotifyApi = new SpotifyWebApi({
			clientId: config.SPOTIFY_CLIENT_ID,
			clientSecret: config.SPOTIFY_CLIENT_SECRET,
			redirectUri: config.SPOTIFY_REDIRECT_URI,
		});

		refreshTokenIfNecessary(client, userSpotifyApi, (error_data) => {
			if (error_data.success) {
				clients[socket.id].accessToken = error_data.client.accessToken;
				clients[socket.id].refreshToken = error_data.client.refreshToken;
				userSpotifyApi.setAccessToken(error_data.client.accessToken);
				userSpotifyApi.setRefreshToken(error_data.client.refreshToken);

				let spotifyID;
				let playlistID;

				userSpotifyApi
					.getMe()
					.then((spotify_data) => {
						spotifyID = spotify_data.body.id;
						return userSpotifyApi.createPlaylist(spotifyID, "DDJ Party", {
							public: true,
						});
					})
					.then((spotify_data) => {
						playlistID = spotify_data.body.id;
						// return userSpotifyApi.addTracksToPlaylist(playlistID, tracks, {
						// 	position: 0,
						// });

						for (let i = 0; i < chunkifiedTracks.length; i++) {
							setTimeout(() => {
								let chunk = chunkifiedTracks[i];
								userSpotifyApi
									.addTracksToPlaylist(playlistID, chunk)
									.then(() => {})
									.catch((error) => {
										console.log(`error creating playlist: ${error}`);
									});
							}, i * 2000);
						}
					})
					.then(() => {
						cb({ success: true });
					})
					.catch((error) => {
						console.log(`error creating playlist: ${error}`);
						cb({ success: false, reason: `error creating playlist: ${error}` });
					});
			} else {
				console.log(error_data.reason);
				cb({ success: false, reason: `error creating playlist: ${error_data.reason}` });
			}
		});
	});

	socket.on("disconnect", (data) => {
		setTimeout(() => {
			let client = clients[socket.id];

			if (client) {
				if (client.roomName && parties[client.roomName]) {
					let index = parties[client.roomName].usernames.indexOf(client.username);
					if (index !== -1) {
						parties[client.roomName].usernames.splice(data.username, 1);
					} else {
						console.log("username wasn't in the username list?");
					}
				}
				// delete:
				delete clients[socket.id];
			}
		}, 1000 * 30);
		// console.log(`#clients: ${Object.keys(clients).length}`);
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

		let songListJSON = JSON.stringify(songList);
		if (party.previousSongListJSON !== songListJSON) {
			parties[roomName].previousSongListJSON = songListJSON;
			io.to(roomName).emit("songList", { songList: songList });
		}
	}
}, 400);
