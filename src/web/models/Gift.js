module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    giftType: {
      type: DataTypes.ENUM('BEER', 'LUNCH', 'DINNER', 'MONEY', 'DATE'),
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: function(models) {
        Gift.belongsTo(models.User, {as: 'Recipient', foreignKey: 'recipientId'});
        Gift.belongsTo(models.User, {as: 'Sender', foreignKey: 'senderId'});
      }
    }
  });

  return Gift;
};
