'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    tablename: 'categories'
  });

  Category.associate = function(models) {
    
    Category.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'idCategory'
    })

  };
  
  return Category;
};