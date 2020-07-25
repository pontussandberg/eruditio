const rooms = {};

const fillRoom = (room, socket) => {
    const peer = getPeer(room, socket.id);
    if (peer) {
        socket.emit('room full', peer);
        socket.to(peer).emit('user joined', socket.id);
    }
};

const getPeer = (room, user) =>
    rooms[room].find(id => id !== user);

const joinRoom = (id, socket) => {
    rooms[id] = rooms[id]
        ? rooms[id].concat(socket.id)
        : [ socket.id ];
};

const leaveRoom = (socket) => {
    if(!rooms[socket.room]) return;

    const peer = getPeer(socket.room, socket.id);
    if (peer) {
        socket.to(peer).emit('user left');
    }
};

const handleDisconnect = socket => () => {
    leaveRoom(socket);
};

const handleJoinRoom = socket => roomId => {
    joinRoom(roomId, socket);
    socket.room = roomId;
    fillRoom(roomId, socket);
};

const handleLeaveRoom = socket => () => {
    socket.disconnect(true);
};

module.exports = {
    handleDisconnect,
    handleJoinRoom,
    handleLeaveRoom,
};
