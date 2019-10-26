const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8099;
const config = require("./config.js");

const Client = require("./client.js").Client;
const Party = require("./client.js").Party;
const Song = require("./client.js").Song;

const session = require("express-session");

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
	let charset = "abcdefghijklmnopqrstuvwxyz123456789";
	let identifier = "";
	for (let counter = 0; counter < sizeOfString; counter++) {
		identifier += charset[Math.floor(Math.random() * charset.length)];
	}
	return identifier;
}

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

		let roomName = data.roomName;

		socket.join(roomName);
		clients[socket.id].roomName = roomName;
		clients[socket.id].username = data.username || "empty";

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

		let party = parties[clients[socket.id].roomName];

		if (!party) {
			console.log("party not found!");
			cb({ success: false, reason: "party not found!" });
			return;
		}

		// data.songName
		// data.type === "up" || "down"
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

		parties[clients[socket.id].roomName].submitSong(data.songName, socket.id);

		// data.songName
		// data.type === "up" || "down"
	});
});

// loop through all the parties and count all the votes
// also send out updates to all connected users:
setInterval(() => {
	for (let roomName in parties) {
		let party = parties[roomName];

		// todo: count votes:
	}
}, 3000);
