module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    facebookId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    deviceToken: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Gift, { as: 'SentGifts', foreignKey: 'senderId' });
        User.hasMany(models.Gift, { as: 'ReceivedGifts', foreignKey: 'recipientId' });
      },
    },
  });

  return User;
};
