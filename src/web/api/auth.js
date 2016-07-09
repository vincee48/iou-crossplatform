import models from '../models';
import passport from 'passport';

const authRouter = (server) => {
  server.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'user_friends', 'email'],
    })
  );

  server.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  server.get('/auth/current/user', (req, res) => {
    res.json({ authenticated: req.isAuthenticated() });
  });
};

module.exports = authRouter;
