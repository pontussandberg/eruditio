const http = require('http');
const socketIO = require('socket.io');
const app = require('./src/app.js');
const socket = require('./src/lib/socket');

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', socket(io));
// const rooms = {};
// io.on('connection', socket => {
//     socket.on('join room', roomID => {
//         if (rooms[roomID]) {
//             rooms[roomID].push(socket.id);
//         } else {
//             rooms[roomID] = [ socket.id ];
//         }
//         socket.room = roomID;
//         const otherUser = rooms[roomID].find(id => id !== socket.id);
//         if (otherUser) {
//             socket.emit('room full', otherUser);
//             socket.to(otherUser).emit('user joined', socket.id);
//         }
//     });

//     socket.on('offer', payload => {
//         io.to(payload.target).emit('offer', payload);
//     });

//     socket.on('answer', payload => {
//         io.to(payload.target).emit('answer', payload);
//     });

//     socket.on('ice-candidate', payload => {
//         io.to(payload.target).emit('ice-candidate', payload.candidate);
//     });

//     socket.on('leave room', () => socket.disconnect(true));

//     socket.on('disconnect', () => {
//         if(!rooms[socket.room]) return;

//         const peer = rooms[socket.room].find(user => user !== socket.id);
//         if (peer !== undefined) socket.to(peer).emit('user left');
//     });
// });

server.listen(5000);
