const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '\public')));

const server = app.listen(app.get('port'), () => {
    console.log('servidor en puerto:', app.get('port'));
});
const SocketIO = require('socket.io');
const io = SocketIO.listen(server);

io.on('connection', (socket) => {
    console.log('nueva conexion', socket.id);

    socket.on('chat:message', (data) => {
        console.log(data);
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});
