const isDevelopmentMode = process.env.MODE === 'DEV';

const clientURL = isDevelopmentMode
	? 'http://localhost:3000'
	: ['https://friends-client.vercel.app/'];

module.exports = { clientURL };
