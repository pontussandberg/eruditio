const http = require('http');
const socketIO = require('socket.io');
const app = require('./src/app.js');
const socket = require('./src/lib/socket');

const server = http.createServer(app);

const io = socketIO(server).of('socket');

io.on('connection', socket(io));

server.listen(process.env.PORT || 5000);
