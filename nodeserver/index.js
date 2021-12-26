//node server for socket.io connection
const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
    //if new user joined
  socket.on("new-user-joind", (name) => {

    users[socket.id] = name;
    //on new user joining it broadcasts the message to all users
    socket.broadcast.emit("user-joined", name);
  });
//on sending a new message
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });
//if any user disconnects
  socket.on("disconnect", (message) => {
    socket.broadcast.emit("leave", users[socket.id]);
    delete users[socket.id];
  });
});
