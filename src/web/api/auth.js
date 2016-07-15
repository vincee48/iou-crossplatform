import models from '../models';
import passport from 'passport';

const authRouter = (server) => {
  /**
   * Login to Facebook
   */
  server.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'user_friends', 'email'],
    })
  );

  /**
   * Response back from Facebook login
   */
  server.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' })
  );

  /**
   * Logout
   */
  server.get('/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    }
  );

  /**
   * Check if user is authenticated
   */
  server.get('/auth/current/user',
    passport.authenticate('facebook-token'),
    (req, res) => {
      res.json({ authenticated: req.isAuthenticated() });
    }
  );
};

module.exports = authRouter;
