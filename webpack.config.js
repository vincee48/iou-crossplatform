require('dotenv').config({ silent: true }); // Heroku builds will not have a .env
module.exports = process.env.NODE_ENV === 'production' ? require('./webpack.production.config.js') : require('./webpack.development.config.js');
