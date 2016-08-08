import models from '../models';
import passport from 'passport';
import { sendPushNotification } from '../utils/fcm';

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
      const senderName = req.user.dataValues.name;
      const giftType = req.body.type || 'beer';
      const description = req.body.description;

      if (recipientId) {
        models.Gift.create({
          giftType,
          description,
          recipientId,
          senderId,
        }).then((gift) => {
          gift.getRecipient()
            .then((recipient) => {
              const message = req.body.message || `${senderName} owes you a gift! :-D`;
              sendPushNotification(recipient.deviceToken, `IOU Gift - ${senderName}`, message);
              res.json(gift);
            }).catch(() => {
              res.sendStatus(500);
            });
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
          where: { id: giftId, recipientId },
          include: [
            { model: models.User, as: 'Sender' },
            { model: models.User, as: 'Recipient' },
          ],
        }).then((gift) => {
          if (gift) {
            gift.update({
              redeemed: true,
            }).then((updatedGift) => {
              const sender = gift.Sender;
              const recipient = gift.Recipient;
              const message = req.body.message || `${recipient.name} wants to redeem a gift, your shout! ;-)`;
              sendPushNotification(sender.deviceToken, `IOU Remember - ${recipient.name}`, message);

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
          where: { id: giftId, senderId },
          include: [
            { model: models.User, as: 'Sender' },
            { model: models.User, as: 'Recipient' },
          ],
        }).then((gift) => {
          if (gift) {
            const sender = gift.Sender;
            const recipient = gift.Recipient;
            const message = req.body.message || `${sender.name} owes you a gift on the house! :-)`;
            sendPushNotification(recipient.deviceToken, `IOU Reminder - ${sender.name}`, message);
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
