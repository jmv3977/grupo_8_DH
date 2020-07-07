const {Category, Product} = require('../database/models')

const controller ={
	
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

 // Create -  Method to store
 store: (req, res) => {

	let product = req.body;
	product.img = req.file.filename;
	product.idUser = req.session.user.id;

	// return res.send(product)

	Product.create(product)
		.then(product => {
			return res.redirect('vista-producto' + product.id)
		})
},	

	// Update - Form to edit
	edit: (req, res) => {

		const product = Product.findByPk(req.params.productId);

		const categories = Category.findAll();

		Promise.all([product, categories])
			.then(([product, categories]) => {
				return res.render('product-edit-form', { product, categories })
			})
	},

	// Update - Method to update
	update: (req, res) => {
		let product = req.body;
		product.idUser = req.session.user.id
		product.img = req.file.filename
		Product.update(product, {
			where: {
				id: req.params.productId
			}
		})
			.then(confirm => {
				return res.redirect('vista-producto' + req.params.productId)
			})
			.catch(error => console.log(error))

	},	

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		Product.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(() => res.redirect('/'))
		
	}
};

module.exports = controller;