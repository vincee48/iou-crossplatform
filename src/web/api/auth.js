import passport from 'passport';
import reactCookie from 'react-cookie';

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
   passport.authenticate('facebook', { failureRedirect: '/login' }),
   (req, res) => {
     res.cookie('access_token', req.user.dataValues.accessToken);
     reactCookie.setRawCookie(req.headers.cookie);
     res.redirect('/');
   }
  );

  /**
   * Logout
   */
  server.get('/logout',
    (req, res) => {
      res.clearCookie('access_token');
      reactCookie.setRawCookie(req.headers.cookie);
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
