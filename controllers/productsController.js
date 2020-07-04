const {Category, Product} = require('../database/models')

const controller = {

    main: (req, res) => {
		
		res.render('main', {product})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
	
		Product.findByPk(req.params.productId, {
			  include: ['category', 'user']
	     })
		    .then(product => { 
				return res.render('vista-producto', {product})
			})
             .catch(error => console.log(error))		

		
	},

	// Ir a la vista del formulario 
	create: (req, res) => {
		Category.findAll()
		   .then(categories => {
		       return res.render('product-create-form', {categories});
	})
	.catch(error => console.log(error))
},

	// Crear producto
	store: (req, res) => {
		
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
		
		let product = products.find(function (product) {
			return product.id == req.params.productId
		})
		res.render('product-edit-form', {product})
	},
	// Update - Method to update
	update: (req, res) => {
		
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
		
		let productosNuevos = products.filter(function(product){
			return product.id != req.params.id;
		})

		let productsJson = JSON.stringify(productosNuevos, null, ' ');

		fs.writeFileSync(productsFilePath, productsJson);

		res.redirect('/');
	}
};

module.exports = controller;