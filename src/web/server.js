require('babel-core/register');
require('css-modules-require-hook/preset');
require('babel-polyfill');

const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const dev = require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const config = require('../../webpack.config.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressSanitized = require('express-sanitize-escape');

const port = process.env.PORT || 3000;
const server = express();
server.use(express.static('dist'));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(expressSanitized());
server.use(cookieParser());
server.use(session({
  secret: 'forty8',
  resave: false,
  saveUninitialized: false,
}));

global.__ENVIRONMENT__ = process.env.NODE_ENV || 'default';

// Otherwise errors thrown in Promise routines will be silently swallowed.
// (e.g. any error during rendering the app server-side!)
process.on('unhandledRejection', (reason, p) => {
  if (reason.stack) {
    console.error(reason.stack);
  } else {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  }
});

// Short-circuit the browser's annoying favicon request. You can still
// specify one as long as it doesn't have this exact name and path.
server.get('/favicon.ico', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'image/x-icon' });
  res.end();
});

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);

  server.use(dev(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  }));
  server.use(hot(compiler));
}

require('./utils/passport')(server);
require('./api')(server);
server.get('*', require('./index').serverMiddleware);

const models = require('./models');
models.sequelize.sync({ force: false }).then(() => {
  server.listen(port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  });
});
