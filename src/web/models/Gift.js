module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    giftType: {
      type: DataTypes.ENUM('beer', 'food', 'heart', 'coffee', 'money'),
    },
    description: {
      type: DataTypes.STRING,
    },
    redeemed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Gift.belongsTo(models.User, { as: 'Recipient', foreignKey: 'recipientId' });
        Gift.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
      },
    },
  });

  return Gift;
};
