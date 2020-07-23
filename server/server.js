const http = require('http');
const socketIO = require('socket.io');
const app = require('./src/app.js');

const server = http.createServer(app);

const io = socketIO(server);
const rooms = {};
io.on('connection', socket => {

    // has to die soon
    socket.on('lol', () => {
        console.log('LOL');
    });
    socket.on('join room', roomID => {
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [ socket.id ];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit('other user', otherUser);
            socket.to(otherUser).emit('user joined', socket.id);
        }
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

    socket.on('leave room', roomID => {
        if (rooms[roomID]) rooms[roomID] = rooms[roomID]
            .filter(id => id !== socket.id);
        const peer = rooms[roomID][0];
        if (peer !== undefined) socket.to(peer).emit('user left');
        socket.disconnect(true);
    });
});

server.listen(5000);
