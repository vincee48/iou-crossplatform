import models from '../models';
import passport from 'passport';
import fb from '../utils/fb';

const userRouter = (server) => {
  /**
   * Get user information
   */
  server.get(`${process.env.API_PREFIX}/user/fb`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      fb(req).api('/me',
        { fields: 'name, id, picture.type(large), cover' },
        (response) => {
          res.json(response);
        }
      );
    }
  );

  /**
   * Get user friends
   */
  server.get(`${process.env.API_PREFIX}/user/fb/friends`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      fb(req).api('/me/friends',
        { fields: 'name, id, picture.type(large), cover' },
        (response) => {
          res.json(response.data);
        }
      );
    }
  );

  /**
   * Find application user
   */
  server.get(`${process.env.API_PREFIX}/user/fb/:fbId`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      const fbId = req.params.fbId;
      models.User.findById(fbId)
        .then((user) => {
          if (user) {
            res.json(user);
          } else {
            res.sendStatus(400);
          }
        });
    }
  );

  /**
   * Get nearby users
   */
  server.get(`${process.env.API_PREFIX}/user/nearby`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      const currentLatitude = req.query.latitude;
      const currentLongitude = req.query.longitude;
      const searchRadius = req.query.radius || 5;
      const currentFbId = req.user.dataValues.facebookId;

      if (currentLatitude && currentLongitude) {
        models.sequelize.query(`SELECT "facebookId", latitude, longitude,
            (
              3959 * acos( cos( radians(:currentLatitude) ) * cos( radians( latitude ) )
              * cos( radians( longitude ) - radians(:currentLongitude)
            )
            + sin( radians(:currentLatitude) ) * sin( radians( latitude ) ) ) ) AS distance
            FROM "Users"
            WHERE private IS false AND "facebookId" != :currentFbId
            GROUP BY "facebookId"
            HAVING (
              3959 * acos( cos( radians(:currentLatitude) ) * cos( radians( latitude ) )
              * cos( radians( longitude ) - radians(:currentLongitude)
            )
            + sin( radians(:currentLatitude) ) * sin( radians( latitude ) ) ) ) < :searchRadius
          `,
          {
            model: models.User,
            replacements: {
              currentLatitude,
              currentLongitude,
              searchRadius,
              currentFbId,
            },
          }).then((users) => {
            res.json(users);
          }).catch(() => {
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(400);
      }
    }
  );
};

module.exports = userRouter;
