const db = require('../db');

const rooms = {};

const diffThan = target => x => x !== target;

const fillRoom = (room, socket) => {
    const peer = getPeer(room, socket.id);
    if (peer) {
        socket.emit('start call', peer);
        socket.to(peer).emit('user joined', socket.id);
    }
};

const getPeer = (room, user) =>
    rooms[room].find(diffThan(user));

const handleDisconnect = socket => () => {
    if(!rooms[socket.room]) return;

    const peer = getPeer(socket.room, socket.id);
    if (peer) {
        socket.to(peer).emit('user left');
    }

    rooms[socket.room] = rooms[socket.room]
        .filter(diffThan(socket.id));
};

const handleJoinRoom = socket => id => {
    if (rooms[id] && rooms[id].length > 1) {
        socket.emit('full room');
        return;
    }

    rooms[id] = rooms[id]
        ? rooms[id].concat(socket.id)
        : [ socket.id ];

    socket.room = id;
    fillRoom(id, socket);
};

const handleLeaveRoom = socket => () => {
    socket.disconnect(true);
    if (rooms[socket.room] && rooms[socket.room].length === 0) {
        db.deleteRoom(socket.room);
    }
};

module.exports = {
    handleDisconnect,
    handleJoinRoom,
    handleLeaveRoom,
};
