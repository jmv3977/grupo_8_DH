'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    id: DataTypes.INTEGER,
    img:DataTypes.STRING,
    idUser:DataTypes.INTEGER,
    idCategory:DataTypes.INTEGER,
    sale:DataTypes.BOOLEAN,
    top:DataTypes.BOOLEAN,
    createdAt:DataTypes.STRING,
    updatedAt:DataTypes.STRING,
    deletedAt:DataTypes.STRING,
  }, {});
  Product.associate = function(models) {
    
    Product.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'idUser'
    })

    Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'idCategory'
    })

  };
  return Product;
};