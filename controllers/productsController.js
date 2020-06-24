const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


function nextId(){

	if(products.length > 0){
		let ultimoProducto = products[products.length - 1];
		
		let id = ultimoProducto.id + 1;
		
		return id;
	}

	return 1;
	
}

nextId()

const controller = {
	// Root - Show all products
	root: (req, res) => {
		// Do the magic
		res.render('products', {products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let product = products.find(function(product){
			return product.id == req.params.productId
		})

		res.render('vista-producto', {product})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let newProduct = {
			id: nextId(),
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: '../public/images/default-image.jpg'
		}

		let newProducts = [...products, newProduct];

		let productsJson = JSON.stringify(newProducts, null, ' ');

		fs.writeFileSync(productsFilePath, productsJson);

		res.redirect('/');

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let product = products.find(function (product) {
			return product.id == req.params.productId
		})
		res.render('product-edit-form', {product})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let productosEditados = products.map( product => {
			if(product.id == req.params.productId){
				product.name = req.body.name;
				product.price = req.body.price;
				product.discount = req.body.discount;
				product.category = req.body.category;
				product.description = req.body.description;
			}

			return product;
		})

		let productsJson = JSON.stringify(productosEditados, null, ' ');

		fs.writeFileSync(productsFilePath, productsJson);

		res.redirect('/');

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let productosNuevos = products.filter(function(product){
			return product.id != req.params.id;
		})

		let productsJson = JSON.stringify(productosNuevos, null, ' ');

		fs.writeFileSync(productsFilePath, productsJson);

		res.redirect('/');
	}
};

module.exports = controller;