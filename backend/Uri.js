const isDevelopmentMode = process.env.MODE === 'DEV';

const clientURL = isDevelopmentMode ? 'http://localhost:5000' : [];

module.exports = { clientURL };
