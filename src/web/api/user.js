import models from '../models';
import passport from 'passport';
import { FB, FacebookApiException } from 'fb';

FB.options({
  appId: process.env.FB_APP_ID,
  appSecret: process.env.FB_APP_SECRET,
});

const userRouter = (server) => {
  server.get('/user/fb/friends',
    passport.authenticate('facebook-token'),
    (req, res) => {
      console.log(req.user);
    })
};

module.exports = userRouter;
