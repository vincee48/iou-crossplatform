import models from '../models';
import passport from 'passport';

const authRouter = (server) => {
  server.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'user_friends', 'email'],
    })
  );

  server.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
      res.cookie('access_token', req.user.dataValues.accessToken);
      res.redirect('/');
    }
  );

  server.post('/auth/facebook/token',
    passport.authenticate('facebook-token'),
    (req, res) => {
      console.log(req.user);
    }
  )

  server.get('/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    }
  );

  server.get('/auth/current/user',
    passport.authenticate('facebook-token'),
    (req, res) => {
      res.json({ authenticated: req.isAuthenticated() });
    }
  );
};

module.exports = authRouter;
