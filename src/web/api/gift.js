import models from '../models';
import passport from 'passport';

const giftRouter = (server) => {

  /**
   * Gifts that you have sent
   */
  server.get(`${process.env.API_PREFIX}/gift/sent`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      models.User.findOne({ where: { facebookId: req.user.dataValues.facebookId }, include: [{ model: models.Gift, as: 'SentGifts' }] })
        .then((user) => {
          if (user) {
            res.json(user);
          }
        });
    }
  );

  /**
   * Gifts that you have received
   */
  server.get(`${process.env.API_PREFIX}/gift/received`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      models.User.findOne({ where: { facebookId: req.user.dataValues.facebookId }, include: [{ model: models.Gift, as: 'ReceivedGifts' }] })
        .then((user) => {
          if (user) {
            res.json(user);
          }
        });
    }
  );

  /**
   * Send gift
   */
  server.post(`${process.env.API_PREFIX}/gift/send`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      const recipientId = req.query.fbId;
      const senderId = req.user.dataValues.facebookId;
      const giftType = req.query.type || 'BEER';
      const description = req.query.description;

      if (recipientId) {
        models.Gift.create({
          giftType,
          description,
          recipientId,
          senderId,
        }).then((response) => {
          res.json(response);
        }).catch(() => {
          res.sendStatus(500);
        });
      } else {
        res.sendStatus(400);
      }
    }
  );

};

module.exports = giftRouter;
