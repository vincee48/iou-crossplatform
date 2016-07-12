module.exports = (sequelize, DataTypes) => {
  const Gift = sequelize.define('Gift', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    giftType: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: function(models) {
        Gift.belongsTo(models.User, {as: 'Recipient', foreignKey: 'recipientId'});
      }
    }
  });

  return Gift;
};
