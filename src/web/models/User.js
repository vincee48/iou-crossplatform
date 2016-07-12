module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    facebookId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    accessToken: {
      type: DataTypes.STRING,
    },
    deviceId: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Gift, { as: 'sender', foreignKey: 'senderId' });
      }
    }
  });

  return User;
};
