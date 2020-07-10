const { Product, Category } = require('../database/models');

const controller = {
	root: (req, res) => {
		let products = Product.findAll({
			limit: 3
		});
		let categories = Category.findAll();

		Promise.all([products, categories])
		.then(data => {
			res.locals.categories = data[1];
			// return res.send(data[0]);
			return res.render('main', { products:data[0] })
		})
},    
	search: (req, res) => {     
		///////falta el armar el codigo del search!!               
		return res.render('results', {productos})
	}
};

module.exports = controller;