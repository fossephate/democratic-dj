class Client {
	constructor(socket) {
		this.socket = socket;
		this.id = socket.id;
		this.userid = null;
		this.username = null;
		this.rooms = [];
		this.joinTime = new Date();

		this.ip = this.socket.handshake.headers["x-real-ip"];
		this.port = this.socket.handshake.headers["x-real-port"];
	}
}

module.exports.Client = Client;
