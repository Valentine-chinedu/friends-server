require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');
const { ExpressPeerServer } = require('peer');
const path = require('path');
const morgan = require('morgan');
const colors = require('colors');
const connectDb = require('./config/db');

const auth = require('./routes/authRouter');
const user = require('./routes/userRouter');
const post = require('./routes/postRouter');
const category = require('./routes/categoryRouter');
const comment = require('./routes/commentRouter');
const notify = require('./routes/notifyRouter');
const message = require('./routes/messageRouter');

connectDb();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONT_URL }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
	SocketServer(socket);
});

// Create peer server
ExpressPeerServer(http, { path: '/' });

app.get('/', (req, res) => {
	res.status(200).json({ message: 'welcome' });
});

// Routes
app.use('/api', auth);
app.use('/api', user);
app.use('/api', post);
app.use('/api', category);
app.use('/api', comment);
app.use('/api', notify);
app.use('/api', message);

const PORT = process.env.PORT || 4000;

http.listen(PORT, () =>
	console.log(
		`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
