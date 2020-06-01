import React, { Component } from "react";
import "./media/roomStyle.css";

class Messages extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={this.props.group} id="message_space">
                    <p id="tag_style">
                        <b>{this.props.tag}</b>
                    </p>
                    <h6 id="message_text">{this.props.msg}</h6>
                </div>
                <br />
            </React.Fragment>
        );
    }
}

export default Messages;
