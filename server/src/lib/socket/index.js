const { handleCall, handleICE } = require('./callHandlers');
const {
    handleDisconnect,
    handleJoinRoom,
    handleLeaveRoom,
} = require('./roomHandlers');

module.exports = io => socket => {
    socket.on('offer', handleCall(io, 'offer'));
    socket.on('answer', handleCall(io, 'answer'));
    socket.on('ice-candidate', handleICE(io));

    socket.on('join room', handleJoinRoom(socket));
    socket.on('leave room', handleLeaveRoom(socket));
    socket.on('disconnect', handleDisconnect(socket));
};
