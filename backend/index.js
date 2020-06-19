const express = require("express");
const { Server } = require("http");
const app = express();
const port = 3000;
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/../frontend/dist"));

app.get("/", (req, res) =>
  res.sendFile(__dirname + "/../frontend/dist/index.html")
);

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

io.on("connection", function (socket) {
  socket.emit("init-chat", "helle");
});
