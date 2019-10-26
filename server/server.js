const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 8099;
const config = require("./config.js");

const Client = require("./client.js").Client;

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

io.on("connection", (socket) => {
	console.log("client connected");
});
