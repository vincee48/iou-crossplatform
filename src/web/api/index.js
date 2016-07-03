const fs = require('fs');

module.exports = (app) => {
  fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
      && (file !== 'index.js')
      && file.substr(file.lastIndexOf('.') + 1) === 'js')
  .forEach((file) => require(`./${file}`)(app));
};
