const app = require('express')();
const path = require('path');
const { instrument } = require("@socket.io/admin-ui")
const httpServer = require('http').Server(app);
const { Server } = require('socket.io');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000","http://localhost:3001", "https://admin.socket.io"],
        credentials: true,
    }
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2b$10$heqvAkYMez.Va6Et2uXInOnkCT6/uQj1brkrbyG3LpopDklcq7ZOS" // "changeit" encrypted with bcrypt
  },
  namespaceName: "/socketAdmin",
});

httpServer.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
