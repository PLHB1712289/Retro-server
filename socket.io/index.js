const TAG_SOCKET_IO = {
  JOIN_ROOM: "join_room",
  REQUEST_CREATE: "request_create",
  REQUEST_REMOVE: "request_remove",
  REQUEST_EDIT: "request_edit",
  RESPONSE_CREATE: "response_create",
  RESPONSE_REMOVE: "response_remove",
  RESPONSE_EDIT: "response_edit",
};

const configSocketIO = (io) => {
  io.on("connection", function (socket) {
    console.log(`[${socket.id}]: connected.`);

    socket.on(TAG_SOCKET_IO.JOIN_ROOM, (idBoard) => {
      socket.join(idBoard);
    });

    socket.on(TAG_SOCKET_IO.REQUEST_CREATE, ({ idBoard, id, content, tag }) => {
      io.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_CREATE, { id, tag, content });
    });

    socket.on(TAG_SOCKET_IO.REQUEST_REMOVE, ({ idBoard, id, tag }) => {
      io.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_REMOVE, { id, tag });
    });

    socket.on(TAG_SOCKET_IO.REQUEST_EDIT, ({ idBoard, id, content, tag }) => {
      io.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_EDIT, { id, tag, content });
    });

    socket.on("disconnect", () => {
      console.log(`[${socket.id}]: disconnected.`);
    });
  });
};

module.exports = configSocketIO;
