module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define('Carts', {
        numeroCarrito: DataTypes.INTEGER,
        total: DataTypes.DECIMAL,
        idUser: DataTypes.INTEGER,

    }, {
        tableName: 'carts'
    });
    Carts.associate = function (models) {
        Carts.belongsTo(models.Users, {
            as: 'user',
            foreignKey: 'idUser'
        })

         Carts.hasMany(models.CartItems, {
             as: 'items',
             foreignKey: 'idCart'
        })
    };
    return Carts;
};