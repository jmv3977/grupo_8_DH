const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/products.json'); 

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	root: (req, res) => {
		
		let inSale = products.filter(function (product) {
			return product.category == 'in-sale'
		});
		
		res.render('main', {inSale})
	},    
	search: (req, res) => {                     
		
		let productoBuscado = req.query.keywords; 

		let productsArray = products.filter(e => e.name ==  productoBuscado); 


		res.render('results', {products: productsArray});  //results.ejs // para que salga el array con el nombre products
	},
};

module.exports = controller;