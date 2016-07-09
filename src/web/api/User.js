import models from '../models';

const userRouter = (server) => {
  server.get(`${server.apiPrefix}/user/`, (req, res) => {
    models.User.count().then((count) => {
      res.send(`${count}`);
    });
  });
}

module.exports = userRouter;
