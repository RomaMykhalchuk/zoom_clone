const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(3000, () => console.log("listen on port"));

io.on("connection", (socket) => {
  socket.on("join-room", () => {
    console.log("joined the room");
  });
});
