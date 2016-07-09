const models = require('../models');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');

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
      console.log(accessToken);
      models.User.findOrCreate({ where: { facebookId: profile.id } })
        .spread((user, created) => {
          console.log(user.get({ plain: true }), 'created: ', created);
          user.accessToken = accessToken;
          user.save()
            .then(() => {
              done(null, user);
            })
            .catch((error) => {
              done(error);
            });
        })
        .catch((error) => {
          done(error);
        });
    }
  ));


  passport.use(new FacebookTokenStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      models.User.findOrCreate({
        where: {
          facebookId: profile.id
        }
      }).spread((user, created) => {
          return done(null, user);
        })
        .catch((error) => {
          done(error);
        });
    }
  ));
};
