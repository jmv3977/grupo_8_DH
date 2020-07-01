'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    rol: DataTypes.BOOLEAN,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Products,{
      as:"products",
      foreignKey: "idUser",
    })
    // associations can be defined here
  };
  return User;
};