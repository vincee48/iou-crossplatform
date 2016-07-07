import models from '../models';
import auth from '../util/authorization';

const userRouter = (server) => {
  server.get(`${server.apiPrefix}/user/`, (req, res) => {
    models.User.count().then((count) => {
      res.send(`${count}`);
    });
  });

  server.get('/user/:id', auth.isAuthenticated, (req, res) => {
    console.log('yay');
  })
};

module.exports = userRouter;
