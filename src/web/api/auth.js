import models from '../models';
import passport from 'passport';
import reactCookie from 'react-cookie';

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
      reactCookie.setRawCookie(req.headers.cookie);
      res.redirect('/');
    }
  );

  server.get('/logout',
    (req, res) => {
      res.clearCookie('access_token');
      reactCookie.setRawCookie(req.headers.cookie);
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
