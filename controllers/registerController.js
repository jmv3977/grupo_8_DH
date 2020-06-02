const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');


const controller = {
	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('register');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		if(req.body.email.trim() == ''){
			res.send('Este campo es obligatorio.');
		} else if (req.body.password == ''){
			res.send('El campo contraseña es obligatorio.');
		} else {

			//Agregar controles por si el archivo no existe o si el json está vacío.
			let usersFilePath = path.join(__dirname, '../data/users.json');
			let users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
			let nextId;

			//Creamos id para el usuario
			if(users == false){
				nextId = 1;
			} else {
				nextId = users[users.length - 1].id + 1;
			}

			// Do the magic
			let user = {
				id: nextId,
				name: req.body.name,
				email: req.body.email,
				password: bcryptjs.hashSync(req.body.password, 10),
				image: '../public/images/default-image.png',
			}

			users = [...users, user];

			let usersJson = JSON.stringify(users, null, ' ');

			fs.writeFileSync(usersFilePath, usersJson);

			res.redirect('/');
		}
	},

	
};

module.exports = controller;