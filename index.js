//dependencies

require('dotenv').config();
require('express-async-errors');
const fileUpload = require('express-fileupload');
const express = require('express');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./src/db/connect');

//security dependencies

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

//app initialization

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
	cors: {
		origin: 'https://friends-client.vercel.app',
	},
});

const PORT = process.env.PORT || 5000;

//cloudinary configuration

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

//Routes

const authRouter = require('./src/routes/auth');
const userRouter = require('./src/routes/user');
const postRouter = require('./src/routes/post');
const chatRouter = require('./src/routes/chat');
const messageRouter = require('./src/routes/message');

//middle wares

const errorHandlerMiddleware = require('./src/middleware/error-handler');
const authorizationMiddleware = require('./src/middleware/authorization');
const notFoundMiddleware = require('./src/middleware/not-found');

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors());

app.get('/', (req, res) => {
	res.status(200).json({ message: 'welcome' });
});

// socket io

const {
	addUser,
	getUserID,
	getSocketID,
	removeUser,
} = require('./src/socket/users');
const {
	createMessage,
	deleteMessages,
	deleteChat,
} = require('./src/utils/messageSocketEvents');

io.on('connection', (socket) => {
	io.emit('usersOnline', addUser(socket.handshake.query.id, socket.id));
	socket.on('send message', async (message, to, chatId, id) => {
		socket
			.to(getSocketID(to))
			.emit('receive message', message, getUserID(socket.id));
		await createMessage({ chatId, id, message });
	});
	socket.on('delete chat', async (chatID, to) => {
		socket.to(getSocketID(to)).emit('delete chat', chatID);
		await deleteChat({ chatID });
	});
	socket.on('clear chat', async (chatID, to) => {
		socket.to(getSocketID(to)).emit('clear chat', chatID);
		await deleteMessages({ chatID });
	});
	socket.on('disconnect', () => {
		io.emit('usersOnline', removeUser(socket.id));
	});
});

//routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authorizationMiddleware, userRouter);
app.use('/api/v1/posts', authorizationMiddleware, postRouter);
app.use('/api/v1/chats', authorizationMiddleware, chatRouter);
app.use('/api/v1/messages', authorizationMiddleware, messageRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		server.listen(PORT, () =>
			console.log(`Server is listening on port ${PORT}`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
