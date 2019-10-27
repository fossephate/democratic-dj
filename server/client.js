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
	constructor(socketid, username, songData) {
		this.socketid = socketid; // socketid of the person who submitted the song
		this.username = username; // username of the person who submitted the song
		// this.songName = songData.songName;
		this.upvotes = 0;
		this.votes = [];
		this.votedSocketids = [];

		this.songName = songData.songName;
		this.songData = songData;
	}

	tallyVotes() {
		this.upvotes = 0;
		for (let i = 0; i < this.votes.length; i++) {
			let vote = this.votes[i];
			if (vote.type === "up") {
				this.upvotes += 1;
			} else if (vote.type === "down") {
				this.upvotes -= 1;
			} else if (vote.type === "neutral") {
				// this.upvotes += 0;
			}
		}
	}

	vote(upOrDown, username, socketid) {
		// edit previous entry if already voted
		if (this.votedSocketids.indexOf(socketid) > -1) {
			// todo:
			// loop through this.votes and find the index vote with a socketid that matches the
			// socketid passed to this function and modify the vote so that vote.type = upOrDown
			let index = this.votes.findIndex((x) => x.socketid === socketid);
			this.votes[index].type = upOrDown;
		} else {
			this.votes.push({
				type: upOrDown,
				username: username,
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

		this.usernames = [];

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

	submitSong(socketid, username, songData) {
		let song = new Song(socketid, username, songData);
		this.songList.push(song);
	}

	tallyVotes() {
		for (let key in this.songList) {
			this.songList[key].tallyVotes();
		}

		this.sortSongList();
	}

	tallyScore() {
		// todo:
	}

	sortSongList() {
		this.songList.sort((a, b) => b.upvotes - a.upvotes);
	}
}

module.exports.Party = Party;
module.exports.Client = Client;
module.exports.Song = Song;
