const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");

let server = https.createServer({
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("fullchain.pem"),
    requestCert: true,
    rejectUnauthorized: false
},app);

const io = require("socket.io").listen(server);
const path = require("path");
const crypto = require("crypto");

const PORT = 4431;
server.listen(PORT, ()=>{
    console.log("secure server created using port: " + PORT);
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/public/", "index.html"));
});

io.on("connection", function (socket) {

    socket.on("create-room", function (data) {
        let randRoomID = crypto.randomBytes(4).toString("hex");
        io.to(socket.id).emit("new-room", randRoomID);
        io.to(socket.id).emit("unique-tag", uniqueTag);

        socket.join(randRoomID);
    });

    const uniqueTag = crypto.randomBytes(3).toString("hex");
    socket.on("send-message", function (msg) {

        messageLink = {
            value: msg.value,
            tag: uniqueTag,
        };
        io.in(msg.currentRoomId).emit("new-message", messageLink);
    });

    socket.on("request-join-room", function (roomVal) {
        io.to(socket.id).emit("accept-requested-room", roomVal);
        io.to(socket.id).emit("unique-tag", uniqueTag);

        socket.join(roomVal);
    });

    socket.on("request-nuke", function (roomID) {
        io.in(roomID).emit("nuke-room");
    });
});
