require('dotenv').config();
require('express-async-errors');
const { clientURL } = require('./URI');
const fileUpload = require('express-fileupload');
const express = require('express');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./db/connect');

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: clientURL } });
const PORT = process.env.PORT || 5000;

//cloudinary configuration

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cors({ origin: clientURL }));

app.get('/', (req, res) => {
	res.status(200).json({ message: 'welcome' });
});
