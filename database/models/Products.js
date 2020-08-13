//'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    img:DataTypes.STRING,
    idUser:DataTypes.INTEGER,
    idCategory:DataTypes.INTEGER,
    sale:DataTypes.INTEGER,
    top:DataTypes.INTEGER
  }, {});
  Products.associate = function(models) {
    
    Products.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'idUser'
    })

    Products.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'idCategory'
    })
    Products.hasMany(models.CartItems, {
      as: 'cartitems',
      foreignKey: 'idProduct'
 })

  };
  return Products;
};