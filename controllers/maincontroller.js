const { Products } = require('../database/models');

const controller = {
	root: (req, res) => {
		let products = Products.findAll({
			limit: 3
		})


		Promise.all([products])
		.then(([products]) => {
			// res.locals.categories = categories;
			// return res.send(data[0]);
			return res.render('main', { products })
		})
},    
	search: (req, res) => {     
		///////falta el armar el codigo del search!!               
		return res.render('results', {productos})
	}
};

module.exports = controller;