const { fillRoom, joinRoom, leaveRoom } = require('./roomHandlers');

module.exports = io => socket => {
    socket.on('join room', roomId => {
        joinRoom(roomId, socket);
        socket.room = roomId;
        fillRoom(roomId, socket);
    });

    socket.on('offer', payload => {
        io.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', payload => {
        io.to(payload.target).emit('answer', payload);
    });

    socket.on('ice-candidate', payload => {
        io.to(payload.target).emit('ice-candidate', payload.candidate);
    });

    socket.on('leave room', () => socket.disconnect(true));

    socket.on('disconnect', () => {
        leaveRoom(socket);
    });
};
