import models from '../models';
import passport from 'passport';

const giftRouter = (server) => {
  /**
   * Gifts that you have sent
   */
  server.get(`${process.env.API_PREFIX}/gift/sent`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      models.Gift.findAll({
        where: {
          senderId: req.user.dataValues.facebookId,
        },
        include: [{ model: models.User, as: 'Recipient' }],
      })
      .then((gifts) => {
        if (gifts) {
          res.json(gifts);
        } else {
          res.sendStatus(400);
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
      models.Gift.findAll({
        where: {
          recipientId: req.user.dataValues.facebookId,
        },
        include: [{ model: models.User, as: 'Sender' }],
      })
      .then((gifts) => {
        if (gifts) {
          res.json(gifts);
        } else {
          res.sendStatus(400);
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
      const recipientId = req.body.recipientId;
      const senderId = req.user.dataValues.facebookId;
      const giftType = req.body.type || 'BEER';
      const description = req.body.description;

      if (recipientId) {
        models.Gift.create({
          giftType,
          description,
          recipientId,
          senderId,
        }).then((response) => {
          res.json(response);
        }).catch((error) => {
          res.sendStatus(500);
        });
      } else {
        res.sendStatus(400);
      }
    }
  );

  /**
   * Redeem gift
   */
  server.post(`${process.env.API_PREFIX}/gift/redeem`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      const giftId = req.body.giftId;
      const recipientId = req.user.dataValues.facebookId;
      if (recipientId) {
        models.Gift.find({
          where: {
            id: giftId,
            recipientId,
          }
        }).then((gift) => {
          if (gift) {
            gift.update({
              redeemed: true,
            }).then((updatedGift) => {
              res.send(updatedGift);
            });
          } else {
            res.sendStatus(400);
          }
        }).catch(() => {
          res.sendStatus(500);
        })
      }
    }
  );

  /**
   * Remind gift
   */
  server.post(`${process.env.API_PREFIX}/gift/remind`,
    passport.authenticate('facebook-token'),
    (req, res) => {
      const giftId = req.body.giftId;
      const senderId = req.user.dataValues.facebookId;
      if (senderId) {
        models.Gift.find({
          where: {
            id: giftId,
            senderId,
          }
        }).then((gift) => {
          if (gift) {
            // send push notification to recipient
          } else {
            res.sendStatus(400);
          }
        }).catch(() => {
          res.sendStatus(500);
        })
      }
    }
  );
};

module.exports = giftRouter;
