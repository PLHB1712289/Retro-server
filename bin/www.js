#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require("../app");
var debug = require("debug")("retro-server:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: true,
  origins: ["http://127.0.0.1:3000"],
});

// Socket io

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

console.log("Socket.io");

const TAG_SOCKET_IO = {
  JOIN_ROOM: "join_room",
  REQUEST_CREATE: "request_create",
  REQUEST_REMOVE: "request_remove",
  REQUEST_EDIT: "request_edit",
  RESPONSE_CREATE: "response_create",
  RESPONSE_REMOVE: "response_remove",
  RESPONSE_EDIT: "response_edit",
};

io.on("connection", function (socket) {
  console.log(`[${socket.id}]: connected.`);

  socket.on(TAG_SOCKET_IO.JOIN_ROOM, (idBoard) => {
    socket.join(idBoard);
  });

  socket.on(TAG_SOCKET_IO.REQUEST_CREATE, ({ idBoard, id, content, tag }) => {
    socket
      .to(idBoard)
      .emit(TAG_SOCKET_IO.RESPONSE_CREATE, { id, tag, content });
  });

  socket.on(TAG_SOCKET_IO.REQUEST_REMOVE, ({ idBoard, id, tag }) => {
    socket.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_REMOVE, { id, tag });
  });

  socket.on(TAG_SOCKET_IO.REQUEST_EDIT, ({ idBoard, id, content, tag }) => {
    socket.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_EDIT, { id, tag, content });
  });

  socket.on("disconnect", () => {
    console.log(`[${socket.id}]: disconnected.`);
  });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
