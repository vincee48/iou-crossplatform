const models = require('../models');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (server) => {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.facebookId);
  });

  passport.deserializeUser((id, done) => {
    models.User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
  });

  passport.use(new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: [
        'id',
        'cover',
        'email',
        'gender',
        'interested_in',
        'name',
        'picture',
        'relationship_status',
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      models.User.findOrCreate({ where: { facebookId: profile.id } })
        .spread((user, created) => {
          console.log(user.get({ plain: true }), 'created: ', created);
          done(null, user);
        })
        .catch((error) => {
          done(error);
        });
    }
  ));
};
