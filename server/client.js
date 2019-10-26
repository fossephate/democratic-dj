class Client {
	constructor(socketid) {
		this.socketid = socketid;
		this.userid = null;
		this.username = null;
		this.roomName = null;
		this.joinTime = new Date();

		this.songsSubmitted = 0;

		// this.ip = this.socket.handshake.headers["x-real-ip"];
		// this.port = this.socket.handshake.headers["x-real-port"];

		this.isHost = false;
	}
}

class Song {
	constructor(songName, socketid) {
		this.socketid = socketid; // socketid of the person who submitted the song
		this.songName = songName;
		this.currentTotal = 0;
		this.votes = [];
		this.votedSocketids = [];
	}

	tallyVotes() {
		this.currentTotal = 0;
		for (let i = 0; i < this.votes.length; i++) {
			let vote = this.votes[i];
			this.currentTotal += vote.type === "up" ? 1 : -1;
		}
	}

	vote(upOrDown, socketid) {
		// edit previous entry if already voted
		if (this.votedSocketids.indexOf(socketid) > -1) {
			// todo:
			// loop through this.votes and find the index vote with a socketid that matches the
			// socketid passed to this function and modify the vote so that vote.type = upOrDown
			//
		} else {
			this.votes.push({
				type: upOrDown,
				socketid: socketid,
			});
			this.votedSocketids.push(socketid);
		}
	}
}

class Party {
	constructor(socketid, roomName) {
		this.socketid = socketid;
		this.roomName = roomName;

		this.songSubmissionLimit = 1;

		this.songList = [];
	}

	vote(songName, upOrDown, socketid) {
		// search for the song by the name:
		let index = null;
		for (let i = 0; i < this.songList.length; i++) {
			if (this.songList[i].songName == songName) {
				index = i;
				break;
			}
		}

		if (index === null) {
			console.log("song not found!");
			return;
		}

		this.songList[index].vote(upOrDown, socketid);
	}

	submitSong(songName, socketid) {
		let song = new Song(songName, socketid);
		this.songList.push(song);
	}
}

module.exports.Party = Party;
module.exports.Client = Client;
module.exports.Song = Song;
