const handleCall = (io, event) => payload => {
    io.to(payload.target).emit(event, payload);
};

const handleICE = io => payload => {
    io.to(payload.target).emit('ice-candidate', payload.candidate);
};

module.exports = {
    handleCall,
    handleICE,
};
