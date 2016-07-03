module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    facebookId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    deviceId: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
