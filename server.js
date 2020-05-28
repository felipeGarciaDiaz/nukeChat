const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const crypto = require("crypto");

const PORT = 60;
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client/public/", "index.html"));
});

io.on("connection", function (socket) {
    console.log("user connected");

    socket.on("create-room", function (data) {
        let randRoomID = crypto.randomBytes(4).toString("hex");
        console.log("Room " + randRoomID + " is being generated...");
        io.to(socket.id).emit("new-room", randRoomID);
        socket.join(randRoomID);
    });

    socket.on("join-room", function (id) {
        console.log("random tag sent");
        io.to(socket.id).emit("random-tag", crypto.randomBytes(2).toString("hex"));
    });
    const uniqueTag = crypto.randomBytes(3).toString("hex");
    socket.on("send-message", function (msg) {
        console.log("msg: " + msg.value, msg.currentRoomId, msg.tag);
        messageLink = {
            value: msg.value,
            tag: uniqueTag,
        };
        io.in(msg.currentRoomId).emit("new-message", messageLink);
    });

    socket.on("request-join-room", function (roomVal) {
        io.to(socket.id).emit("random-tag", crypto.randomBytes(2).toString("hex"));
        io.to(socket.id).emit("accept-requested-room", roomVal);
        socket.join(roomVal);
    });
});

http.listen(PORT, function () {
    console.log("server started using port: " + PORT);
});
