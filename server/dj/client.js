class Client {
	constructor(socketid) {
		this.socketid = socketid;
		this.userid = null;
		this.username = null;
		this.roomName = null;
		this.joinTime = new Date();

		this.songsSubmitted = 0;

		this.accessToken = null;
		this.refreshToken = null;
		this.code = null;
		this.tokenExpiration = null;

		// this.ip = this.socket.handshake.headers["x-real-ip"];
		// this.port = this.socket.handshake.headers["x-real-port"];

		this.isHost = false;
	}
}

class Song {
	constructor(socketid, username, songData) {
		this.socketid = socketid; // socketid of the person who submitted the song
		this.username = username; // username of the person who submitted the song
		this.upvotes = 0;
		this.votes = [];
		this.votedUsernames = [];

		this.songName = songData && songData.songName;
		this.preview_url = songData && songData.preview_url;
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
		if (this.votedUsernames.indexOf(username) > -1) {
			// todo:
			// loop through this.votes and find the index vote with a username that matches the
			// username passed to this function and modify the vote so that vote.type = upOrDown
			let index = this.votes.findIndex((x) => x.username === username);
			this.votes[index].type = upOrDown;
		} else {
			this.votes.push({
				type: upOrDown,
				username: username,
				socketid: socketid,
			});
			this.votedUsernames.push(username);
		}
	}
}

class Party {
	constructor(socketid, roomName) {
		this.socketid = socketid;
		this.roomName = roomName;

		this.usernames = [];

		this.songSubmissionLimit = 20;
		this.submissionCounts = {};

		this.songList = [];
		this.previousSongListJSON = null;
	}

	submitSong(socketid, username, songData) {
		let song = new Song(socketid, username, songData);
		this.songList.push(song);
	}

	tallyVotes() {
		for (let i = 0; i < this.songList.length; i++) {
			this.songList[i].tallyVotes();
		}

		this.sortSongList();
	}

	sortSongList() {
		let isSorted = true;

		for (let i = 0; i < this.songList.length - 1; i++) {
			let song1 = this.songList[i];
			let song2 = this.songList[i + 1];

			if (song1.upvotes < song2.upvotes) {
				isSorted = false;
				break;
			}
		}

		if (!isSorted) {
			this.songList.sort((a, b) => b.upvotes - a.upvotes);
		}
	}

	recreateFromJSON(data) {
		this.socketid = data.socketid;
		this.roomName = data.roomName;
		// this.usernames = data.usernames;
		this.usernames = [];
		this.songSubmissionLimit = data.songSubmissionLimit;
		this.songList = data.songList;
		this.previousSongListJSON = data.previousSongListJSON;
		this.submissionCounts = data.submissionCounts;
		this.accessToken = data.accessToken;
		this.refreshToken = data.refreshToken;
		this.code = data.code;
		this.tokenExpiration = data.tokenExpiration;
	}

	recreateSongList(spotifyApi) {
		let newSongList = [];
		for (let i = 0; i < this.songList.length; i++) {
			let oldSong = this.songList[i];
			let newSong = new Song(oldSong.socketid, oldSong.username, {
				...oldSong.songData,
			});
			newSong.votes = oldSong.votes;
			newSong.votedUsernames = oldSong.votedUsernames;
			let newURL = oldSong.songData.preview_url || null;
			newSong.preview_url = newURL;
			newSong.songData.preview_url = newURL;
			// let trackURI = /^spotify:track:(.+)$/.exec(oldSong.songData.uri)[1];
			// spotifyApi
			// 	.getTrack(trackURI)
			// 	.then((res) => {
			// 		let newURL = res.body.preview_url || oldSong.songData.preview_url;
			// 		newSong.preview_url = newURL;
			// 		newSong.songData.preview_url = newURL;
			// 	})
			// 	.catch((error) => {
			// 		console.log("promise rejected");
			// 		console.log(error);
			// 	});
			newSongList.push(newSong);
		}

		this.songList = newSongList;
	}
}

module.exports.Party = Party;
module.exports.Client = Client;
module.exports.Song = Song;
