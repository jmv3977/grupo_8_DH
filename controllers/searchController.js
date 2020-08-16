const db = require('../database/models/index.js')
const Products = db.Products;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const searchController = {

  search: (req, res) => {
    Products.findAll({
        where: {
          name: {
            [Op.substring]: req.body.search
          }
        }
      })
      .then(function (result) {
        return res.render('results', {
          result
        })
      })
  }

};

module.exports = searchController;