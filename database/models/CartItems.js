module.exports = (sequelize, DataTypes) => {
    const CartItems = sequelize.define('CartItems', {
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        quantity: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        subtotal: DataTypes.DECIMAL,
        idCart: DataTypes.INTEGER,
        idUser: DataTypes.INTEGER,
        idProduct: DataTypes.INTEGER
    }, {
        tableName:'cartitems'
    });
      CartItems.associate = function (models) {
         CartItems.belongsTo(models.Carts, {
             as: 'cart',
             foreignKey: 'idCart'
         })
 
         CartItems.belongsTo(models.Users, {
             as: 'user',
             foreignKey: 'idUser'
         })
        CartItems.belongsTo(models.Products, {
             as: 'product',
             foreignKey: 'idProduct'
         })
     };

    return CartItems;
};