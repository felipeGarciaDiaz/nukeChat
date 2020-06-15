import React, { Component } from "react";
import "./media/roomStyle.css";
import Messages from "./messages";
import socket from "./socket";
let splitter = "splitteral32019kejaoe02918230qi10xkdjsplitter";
class Room extends Component {
    state = { messages: [], value: "", currentRoomId: this.props.room, userTag: null, sender: "green" };
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <h5 className="col s6" id="room_name_text">
                        {"ID : " + this.props.room}
                    </h5>

                    {this.state.messages.map((message) => (
                        <React.Fragment>
                            <Messages
                                id="message"
                                key={this.state.messages.length + 1}
                                group={message.split(splitter)[0]}
                                tag={message.split(splitter)[1]}
                                msg={message.split(splitter)[2]}
                            />
                        </React.Fragment>
                    ))}
                    <div id="send_message" className="col s12">
                        <div className="col s3">
                            <button className="btn" id="nuke_message" onClick={this.nukeRoom}>
                                Nuke
                            </button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="col s6">
                                <input
                                    className="materialize-textarea"
                                    id="write_message"
                                    placeholder=" your message"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="col s3">
                                <button className="btn" id="submit_message">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };
    handleSubmit = (e) => {
        socket.emit("send-message", this.state);

        this.setState({ value: "" });
        e.target.reset();
    };
    nukeRoom = () => {
        socket.emit("request-nuke", this.state.currentRoomId);
    };

    componentDidMount = () => {
        socket.on("unique-tag", (tag) => {
            this.setState({ userTag: tag });
        });

        socket.on("new-message", (msg) => {
            let uColor = "col s8 offset-s4 inline";
            if (msg.tag === this.state.userTag) {
                uColor = "col s8 offset-s4 inline";
            } else {
                uColor = "col s8 inline";
            }

            this.state.messages.push(uColor + splitter + msg.tag + ": " + splitter + msg.value);
            this.setState({ value: "" });
        });
        socket.on("nuke-room", () => {
            window.location.reload(true);
        });
    };
}
export default Room;
