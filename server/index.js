// Load required modules
const http = require("http"); // http server core module
const path = require("path");
const express = require("express"); // web framework external module

// Set process name
process.title = "networked-aframe-server";

// Get port or default to 8080

//const port = process.env.PORT || 3010;
const port = process.env.PORT || 3010;

// Setup and configure Express http server.
const app = express();
app.use(express.static(path.resolve(__dirname, "..", "examples/lab")));

// Serve the example and build the bundle in development.
if (process.env.NODE_ENV === "development") {
  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const config = require("../webpack.dev");

  app.use(
    webpackMiddleware(webpack(config), {
      publicPath: "/dist/"
    })
  );
}

// Start Express http server
const webServer = http.createServer(app);
const io = require("socket.io")(webServer);

const rooms = {};

io.on("connection", socket => {
  console.log("Un usuario se quiere conectar: ", socket.id);

  let curRoom = null;

  socket.on("joinRoom", data => {
    const { room } = data;

    if (!rooms[room]) {
      rooms[room] = {
        name: room,
        occupants: {},
      };
    }

    const joinedTime = Date.now();
    rooms[room].occupants[socket.id] = joinedTime;
    curRoom = room;

    console.log(`El usuario: ${socket.id} se ah unido a la sala ${room}`);
    socket.join(room);

    socket.emit("connectSuccess", { joinedTime });
    const occupants = rooms[room].occupants;
    io.in(curRoom).emit("occupantsChanged", { occupants });
  });

  socket.on("send", data => {
    io.to(data.to).emit("send", data);
    
  });

  socket.on("broadcast", data => {
    socket.to(curRoom).broadcast.emit("broadcast", data);
  });

  socket.on("disconnect", () => {

    if (rooms[curRoom]) {
      console.log("se desconectó el usuario: ", socket.id);

      delete rooms[curRoom].occupants[socket.id];
      const occupants = rooms[curRoom].occupants;
      socket.to(curRoom).broadcast.emit("occupantsChanged", { occupants });

      if (occupants == {}) {
        console.log("No hay ocupantes");
        delete rooms[curRoom];
      }
    }
  });
});

webServer.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});
