import React, { Component } from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import Room from "./room";
import socket from "./socket";

const reactDev = true;
class CreateRoom extends Component {
    state = {
        room: "room",
        roomMade: false,
        roomValue: null,
    };
    render() {
        if (this.state.roomMade === false) {
            return (
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col s10 offset-s1 m8 offset-m2 l6 offset-l3" id="room_create_body">
                                <h3 className="center-align" id="service_title">
                                    Create a
                                    <b style={{ color: "#f08a5d" }}>
                                        &nbsp;
                                        <u>nuke</u>
                                        &nbsp;
                                    </b>
                                    room!
                                </h3>
                                <Router>
                                    <Link to={this.state.room}>
                                        <p className="center-align">
                                            <input
                                                id="create_room"
                                                type="submit"
                                                value="Create"
                                                onClick={this.onRequestRoom}
                                            />
                                        </p>
                                    </Link>
                                </Router>
                                <div className="col s10 offset-s1 m8 offset-m2 l10 offset-l1 ">
                                    <form onSubmit={this.onJoinRoom} className="input-field">
                                        <input
                                            className="materialize-textarea"
                                            id="choose_id"
                                            placeholder=" room id"
                                            value={this.state.roomValue}
                                            onChange={this.handleChange}
                                        />
                                        <p className="center-align">
                                            <input id="join_room" type="submit" value="Join"></input>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Room room={this.state.room} />
                </React.Fragment>
            );
        }
    }
    /* componentDidCatch = () => {
        socket.on("connected", (ID) => {
            this.setState({ room: ID });
        });
    }; */
    handleChange = (e) => {
        this.setState({ roomValue: e.target.value });
    };
    onRequestRoom = () => {
        socket.emit("create-room");

        socket.on("new-room", (ID) => {
            this.setState({ room: ID, roomMade: true });
        });
    };
    onJoinRoom = () => {
        socket.emit("request-join-room", this.state.roomValue);
        socket.on("accept-requested-room", (roomVal) => {
            this.setState({ room: roomVal, roomMade: true });
        });
    };
}

/*
function CurrentPath() {
    let locate = useLocation();
    return locate.pathname;
}*/

export default CreateRoom;
