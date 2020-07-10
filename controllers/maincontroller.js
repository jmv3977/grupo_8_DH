const { Producto } = require('../database/models');

const controller = {
	root: (req, res) => {
		
		Producto.findAll({
			where: {
				Producto
			}
		}) 
		     .then(productos => {
				 return res.render('main', {productos})
			 })
	},    
	search: (req, res) => {     
		///////falta el armar el codigo del search!!               
		return res.render('results', {productos})
	}
};

module.exports = controller;