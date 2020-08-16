const {validationResult} = require('express-validator');
const {Category, Products} = require('../database/models')
const db = require('../database/models');

const controller ={
	
	// Detail - Detail from one product
	detail: (req, res) => {
	
		Products.findByPk(req.params.productId, {
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
		const errors = validationResult(req)
			if (errors.isEmpty()) {
		let product = req.body;
		product.img = req.file.filename;
		product.idUser = req.session.user.id;


		Products.create(product)
			.then(product => {
				return res.redirect('vista-producto' + product.id)
			})
			.catch(error => console.log(error))
		}	else { Category.findAll()
			.then(categories =>{

	  		return res.render('product-create-form', { categories,  errors: errors.mapped(), old: req.body });
	  		})
			.catch(error => console.log(error))
		}
		},

	// Update - Form to edit
	edit: (req, res) => {

		const product = Products.findByPk(req.params.productId);

		const categories = Category.findAll();

		Promise.all([product, categories])
			.then(([product, categories]) => {
				return res.render('product-edit-form', { product, categories })
			})
			.catch(error => console.log(error))
	},

	// Update - Method to update
	update: (req, res) => {
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			Products.findByPk(req.params.productId)
			.then(productoEncontrado => {
				let product = req.body;
				product.idUser = req.session.user.id
				product.img = req.file ? req.file.filename : productoEncontrado.img

				Products.update(product, {
			where: {
				id: req.params.productId
			}
		})
			.then(confirm => {
				return res.redirect('vista-producto' + req.params.productId)
			})
			.catch(error => console.log(error))
		})

	} else {
		const product = Products.findByPk(req.params.productId);

            const categories = Category.findAll();

            Promise.all([product, categories])
                .then(([product, categories]) => {
                        let objeto = {
                        product,
                        categories,
                        errors: errors.mapped(),
                        old: req.body
					}
				return res.render('product-edit-form', objeto)
					} )
				.catch(error => console.log(error))
			}
		},
	// Delete - Delete one product from DB
	destroy : (req, res) => {

		Products.destroy({
			where: {
				id: req.params.id
			}
		})
			.then(() => res.redirect('/'))
		
	}
};

module.exports = controller;