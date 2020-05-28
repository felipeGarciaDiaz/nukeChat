import React from "react";
import ReactDOM from "react-dom";
import "./components/media/style.css";
import CreateRoom from "./components/createRoom";
import * as serviceWorker from "./serviceWorker";
import "materialize-css/dist/css/materialize.min.css";

ReactDOM.render(
    <React.StrictMode>
        <CreateRoom />
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
