const { Category } = require('../database/models');

function categoriesMiddleware(req, res, next){

    Category.findAll()
        .then( function(categories) {
            res.locals.categories = categories;
            return next();        
        })
}

module.exports = categoriesMiddleware;