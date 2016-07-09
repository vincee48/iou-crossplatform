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
  });

  return User;
};
