//'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.INTEGER    //BOOLEAN    
  });
  Users.associate = function(models) {
    Users.hasMany(models.Products,{
      as:"product",
      foreignKey: "idUser",
    })
    Users.hasMany(models.Carts, {
      as: 'cart',
      foreignKey: 'idUser'
  })
  Users.hasMany(models.CartItems, {
    as: 'items',
    foreignKey: 'idUser'
})

    // associations can be defined here
  };
  return Users;
};