const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.get("/", (req, res) => {
    res.send("Hello World ");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newTicket', (ticket) => {
        console.log(ticket);

        io.broadcast.emit('newTicket', ticket);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});