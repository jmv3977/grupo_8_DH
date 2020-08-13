const { CartItems, Products, Carts, sequelize} = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../database/models')


const cartController = {
  index: (req, res) => {
    db.CartItems.findAll({
        where: {
          [Op.and]: [{
              idUser: req.session.user.id
            },
            {
              status: 0
            }
          ]
        },
        include: [{
          association: 'product',
        }],
      })
      .then((cartProducts) => {
               return res.render('carrito', { cartProducts })
      })
      .catch(error => console.log(error))
  },
  
  addToCart: (req, res) => {

    db.Products.findByPk(req.body.id)
      .then(product => {
        let item = {
          name: product.name,
          price: parseFloat(product.price),
          status: 0,
          quantity: req.body.quantity,
          subtotal: parseFloat(product.price) * req.body.quantity,
          idCart: null,
          idUser: req.session.user.id,
          idProduct: product.id
        }
        db.CartItems.create(item)
      })
      .then(() => {
        return res.redirect('/cart')
      })
      .catch(error => console.log(error))
  },

  destroy: function (req, res) {

    CartItems.destroy({
      where: {
        id: req.body.idCartItems,
      }

    }).then(() => {
      return res.redirect('/cart');
    })
      .catch(error => console.log(error))
  },

  purchase: function (req, res) {

  let items;
    // Buscar todos los items para tenerlos guardados
    CartItems.findAll({
        where: {
          idUser: req.session.user.id,
          status: 0,
        },
      })
      .then((itemsEncontrados) => {
        items = itemsEncontrados;
        // Cerrar los items
        return sequelize.query(
          `UPDATE cartItem SET status = 1 WHERE idUser = ${req.session.user.id} AND status = 0`
        );
      })
      .then(() => {
        return Cart.findOne({
          order: [
            ["createdAt", "DESC"]
          ],
        });
      })
      .then((carts) => {
        let newCart = {
          numeroCarrito: carts ? carts.numeroCarrito + 1 : 1,
          total: items.reduce((total, cartProduct) => (total += parseFloat(cartProduct.subtotal)), 0),
          idUser: req.session.user.id,
        };
        return Cart.create(newCart);
      })
      .then((cart) => {
        return sequelize.query(
          `UPDATE cartItem SET idCart = ${cart.id} WHERE idUser = ${req.session.user.id} AND idCart IS NULL`
        );
      })
      .then(() => {
        return res.redirect('/cart/history')
      }) 
      .catch(error => console.log(error))
  },

   history: function (req, res) {
     Carts.findAll({
       where: {
         idUser: req.session.user.id,
       },
       include: {
         all: true,
       /*   nested: true, */
       },
     }).then((carts) => {
       return res.render('history', { carts });
     })
       .catch(error => console.log(error))
   }

}

module.exports = cartController;