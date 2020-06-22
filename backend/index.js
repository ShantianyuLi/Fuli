const express = require("express");
const { Server } = require("http");
const app = express();
const port = 3000;
const server = require("http").Server(app);
const io = require("socket.io")(server);

appData = {
  /*
    roomId: {
      creatorId: String
      users: []
    }
  */
}

app.use(express.static(__dirname + "/../frontend/dist"));

app.get("/", (req, res) =>
  res.sendFile(__dirname + "/../frontend/dist/index.html")
);

server.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

io.on("connection", function (socket) {
  socket.emit("init-chat", "hello");

  socket.on("create-room", function (data) {
    const { roomId } = data;
    appData[roomId] = {};
    appData[roomId].users = [];
    socket.emit("after-create-room", { isSuccess: true, users: [] })
  });

  socket.on("add-room", function (data) {
    const { roomId, userName } = data;
    try {
      appData[roomId].users.push(userName);
      socket.emit("after-add-room", {
        isSuccess: true,
        users: appData[roomId].users,
        userName: userName,
        roomId: roomId
      });
      console.log(appData[roomId].users)
    } catch (error) {
      socket.emit("after-add-room", { isSuccess: false });
    }
  })

  socket.on("start-game", function (data) {
    const { roomId } = data;
    socket.emit("after-start-game", { roodId: roomId, question: "谁是世界上最漂亮的女人？", state: "question" })
    console.log(roomId);
  });

});
