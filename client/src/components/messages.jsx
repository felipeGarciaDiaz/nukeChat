import React, { Component } from "react";
import socket from "./socket";
class Messages extends Component {
    render() {
        return (
            <div className="col s12  inline">
                <h6>{this.props.msg}</h6>
            </div>
        );
    }
}

export default Messages;
