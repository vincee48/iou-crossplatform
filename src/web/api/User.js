const models = require('../models');

const UserRouter = (app) => {
  app.get(`${app.apiPrefix}/user/`, (req, res) => {
    models.User.count().then((count) => {
      res.send(`${count}`);
    });
  });
};

module.exports = UserRouter;
