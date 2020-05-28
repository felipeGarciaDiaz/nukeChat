import React, { Component } from "react";
import "./media/roomStyle.css";
import Messages from "./messages";
import socket from "./socket";
class Room extends Component {
    state = { messages: ["test"], value: "", currentRoomId: this.props.room, tag: "0" };
    render() {
        return (
            <React.Fragment>
                <p>{"Room ID | " + this.props.room}</p>
                <div className="row">
                    {this.state.messages.map((message) => (
                        <Messages id={this.state.messages.length + 1} tempUniqueTag={this.state.tag} msg={message} />
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
                                <button className="btn" id="submit_message" onClick={this.sendMessage}>
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
        console.log("BOOM!");
    };

    componentDidMount = () => {
        socket.on("new-message", (msg) => {
            console.log(msg + " new");
            this.state.messages.push(msg.tag + " : " + msg.value);
            this.setState({ value: "" });
        });

        console.log("component did catch");
        /*socket.on("random-tag", (randomTag) => {
            console.log("random tag recieved " + randomTag);
            this.setState({ tag: randomTag });
        });*/
    };
}
export default Room;
