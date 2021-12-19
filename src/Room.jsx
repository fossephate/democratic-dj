// react:
import React, { PureComponent } from "react";

// react-router:
import { withRouter } from "react-router";

// redux:
import { connect } from "react-redux";

// redux-saga:
import { updateSongList } from "features/songs.js";

// main components:

// components:
import SongList from "components/general/SongList.jsx";
import SongSubmitForm from "components/general/SongSubmitForm.jsx";

// secondary components:
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

// material ui:
import { withStyles } from "@material-ui/core/styles";

// recompose:
import { compose } from "recompose";

// libs:
import { device } from "shared/libs/utils.js";
import localforage from "localforage";

// jss:
const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    fontSize: "16px",
    width: "100%",
    maxWidth: "600px",
  },
  [device.tablet]: {
    root: {
      fontSize: "20px",
    },
  },
  [device.laptop]: {
    root: {},
  },

  textField: {
    margin: "0px",
  },
  formPart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // width: "50%",
    height: "min-content",
  },
  exportButton: {
    width: "80%",
  },
  logoutButton: {},
  spotifyButtonsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
};

class Room extends PureComponent {
  constructor(props) {
    super(props);
    this.socket = null;

    this.state = {
      username: "",
      roomName: "",
      openUsernameDialog: false,
      loggedIn: false,
      code: null,
    };

    this.roomName = null;
  }

  componentDidMount() {
    // // listen to events and dispatch actions:
    // handleStreamEvents(this.socket, this.props.store.dispatch);
    // // handle outgoing events & listen to actions:
    // // and maybe dispatch more actions:
    // this.props.sagaMiddleware.run(handleStreamActions, {
    // 	socket: this.socket,
    // 	dispatch: this.props.store.dispatch,
    // });

    this.socket = this.props.serverConnection;

    this.roomName = this.props.match.params.roomName;

    if (!this.roomName) {
      console.log("room name not set!");
    }

    this.socket.on("songList", (data) => {
      this.props.updateSongList(data.songList);
    });

    localforage
      .getItem("dj:roomInfo")
      .then((value) => {
        if (value) {
          if (value.username) {
            this.socket.emit(
              "joinRoom",
              { roomName: this.roomName, username: value.username },
              (data) => {
                if (data.success) {
                  if (value.code) {
                    this.socket.emit(
                      "verifyToken",
                      { code: value.code },
                      (data) => {
                        if (data.success) {
                          this.setState({
                            openUsernameDialog: false,
                            username: value.username,
                            loggedIn: true,
                            code: value.code,
                          });
                        } else {
                          console.log(data.reason);
                          this.setState({
                            openUsernameDialog: false,
                            username: value.username,
                          });
                        }
                      }
                    );
                  } else {
                    this.setState({ username: value.username });
                  }
                } else {
                  this.setState({ openUsernameDialog: true });
                }
              }
            );
          } else {
            localforage.clear();
          }
        } else {
          this.setState({ openUsernameDialog: true });
        }
      })
      .catch((error) => {
        this.setState({ openUsernameDialog: true });
      });
  }

  componentWillUnmount() {}

  // shouldComponentUpdate(nextProps, nextState) {
  // 	return false;
  // }

  handleSubmitUsername = () => {
    if (this.state.username === "") {
      alert("username can't be empty");
      return;
    }

    this.socket.emit(
      "joinRoom",
      { roomName: this.roomName, username: this.state.username },
      (data) => {
        if (data.success) {
          this.setState({ openUsernameDialog: false });
          localforage.setItem("dj:roomInfo", {
            roomName: this.roomName,
            username: this.state.username,
          });
        } else {
          alert(data.reason);
        }
      }
    );
  };

  handleText = (event) => {
    this.setState({ username: event.target.value });
  };

  handleLogin = () => {
    if (this.state.username === "") {
      alert("something went wrong!");
      window.location.reload();
      return;
    }
    localforage
      .setItem("dj:roomInfo", {
        roomName: this.roomName,
        username: this.state.username,
      })
      .then(() => {
        window.location.href =
          "https://accounts.spotify.com/authorize?response_type=code&client_id=501dbd9176ef4ef9af88bfedf7cb7e5a\
					&scope=playlist-modify-private%20user-read-private%20user-read-email%20playlist-read-collaborative%20user-modify-playback-state%20playlist-modify-public%20playlist-read-private\
					&redirect_uri=https%3A%2F%2Ffosse.co%2Fdj%2Fcallback";
      });
  };

  handleLogout = () => {
    localforage
      .getItem("dj:roomInfo")
      .then((value) => {
        roomName = value.roomName;
        return localforage.setItem("dj:roomInfo", { ...value, code: null });
      })
      .then(() => {
        window.location.reload();
      });
  };

  handleCreatePlaylist = () => {
    this.socket.emit("createPlaylist", { code: this.state.code }, (data) => {
      if (data.success) {
        alert("playlist created on your spotify account!");
      } else {
        console.log(data.reason);
      }
    });
  };

  handleLogout = () => {
    this.socket.emit("createPlaylist", { code: this.state.code }, (data) => {
      if (data.success) {
        alert("playlist created on your spotify account!");
      } else {
        console.log(data.reason);
      }
    });
  };

  render() {
    console.log("rendering dj-room.");

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <SongSubmitForm serverConnection={this.props.serverConnection} />
        {this.props.searchResults.length > 0 && (
          <SongList
            serverConnection={this.props.serverConnection}
            source={this.props.searchResults}
            type="results"
          />
        )}
        {this.props.searchResults.length === 0 && (
          <SongList
            serverConnection={this.props.serverConnection}
            username={this.state.username}
            source={this.props.songList}
            type="songs"
          />
        )}

        {!this.state.loggedIn ? (
          <Button
            className={classes.exportButton}
            onClick={this.handleLogin}
            color="primary"
            variant="contained"
          >
            Login to Spotify
          </Button>
        ) : (
          <div className={classes.spotifyButtonsContainer}>
            <Button
              className={classes.exportButton}
              onClick={this.handleCreatePlaylist}
              color="primary"
              variant="contained"
            >
              Export to Spotify
            </Button>
            <Button
              className={classes.logoutButton}
              onClick={this.handleLogout}
              color="primary"
              variant="contained"
            >
              Logout
            </Button>
          </div>
        )}

        <Dialog
          open={this.state.openUsernameDialog}
          onClose={() => {}}
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Pick a username</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="username"
              value={this.state.username}
              onChange={this.handleText}
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  this.handleSubmitUsername();
                }
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmitUsername}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    songList: state.dj.songs.songList,
    searchResults: state.dj.songs.searchResults,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSongList: (data) => {
      dispatch(updateSongList(data));
    },
  };
};

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Room);
