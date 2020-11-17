const TAG_SOCKET_IO = {
  JOIN_ROOM: "join_room",
  REQUEST_CREATE: "request_create",
  REQUEST_REMOVE: "request_remove",
  REQUEST_EDIT: "request_edit",
  REQUEST_DND: "request_dnd",
  REQUEST_FOCUS_ITEM: "request_focus_item",
  REQUEST_CANCEL_FOCUS_ITEM: "request_cancel_focus_item",
  RESPONSE_CREATE: "response_create",
  RESPONSE_REMOVE: "response_remove",
  RESPONSE_EDIT: "response_edit",
  RESPONSE_DND: "response_dnd",
  RESPONSE_FOCUS_ITEM: "response_focus_item",
  RESPONSE_CANCEL_FOCUS_ITEM: "response_cancel_focus_item",
};

const configSocketIO = (io) => {
  io.on("connection", function (socket) {
    console.log(`[${socket.id}]: connected.`);

    socket.on(TAG_SOCKET_IO.JOIN_ROOM, (idBoard) => {
      console.log("JOIN");
      socket.join(idBoard);
    });

    socket.on(TAG_SOCKET_IO.REQUEST_CREATE, ({ idBoard, id, content, tag }) => {
      console.log(TAG_SOCKET_IO.REQUEST_CREATE);
      io.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_CREATE, { id, tag, content });
    });

    socket.on(TAG_SOCKET_IO.REQUEST_REMOVE, ({ idBoard, id, tag }) => {
      io.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_REMOVE, { id, tag });
    });

    socket.on(TAG_SOCKET_IO.REQUEST_EDIT, ({ idBoard, id, content, tag }) => {
      io.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_EDIT, { id, tag, content });
    });

    socket.on(TAG_SOCKET_IO.REQUEST_DND, ({ idBoard, id, newTag, oldTag }) => {
      io.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_DND, { id, newTag, oldTag });
    });

    socket.on(TAG_SOCKET_IO.REQUEST_FOCUS_ITEM, ({ idBoard, id, tag }) => {
      socket.to(idBoard).emit(TAG_SOCKET_IO.RESPONSE_FOCUS_ITEM, { id, tag });
    });

    socket.on(
      TAG_SOCKET_IO.REQUEST_CANCEL_FOCUS_ITEM,
      ({ idBoard, id, tag }) => {
        socket
          .to(idBoard)
          .emit(TAG_SOCKET_IO.RESPONSE_CANCEL_FOCUS_ITEM, { id, tag });
      }
    );

    socket.on(TAG_SOCKET_IO.LEAVE_ROOM, ({ idBoard }) => {
      console.log("leave_room");
      socket.leave(idBoard);
    });

    socket.on("disconnect", () => {
      console.log(`[${socket.id}]: disconnected.`);
    });
  });
};

module.exports = configSocketIO;
