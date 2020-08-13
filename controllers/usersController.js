const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { Users, Products } = require('../database/models');
//const product = require('../database/models/product');

const controller = {
   register: function (req, res) {
     return res.render('users/register');
   },
 
   processRegister: function (req, res) {
     const errors = validationResult(req);
      console.log(errors)
     const user = req.body;
     if (errors.isEmpty()) {
       //hasheo la contrasena: aca le estoy diciendo q el req.password equivale a la contrasena haseada
       user.password = bcrypt.hashSync(user.password, 10);
       //aca le digo que borre
       delete user.retype;
       (user.rol = 0),
         Users.create(user)
           .then(function () {
             return res.redirect('/users/login');
           })
           .catch(function (err) {
             // print the error details
             console.log(err);
           });
     } else {
       return res.render('users/register', { errors: errors.mapped(), old: req.body })
         .catch(error => console.log(error))
        }
     
   },
 
   login: function (req, res) {
     return res.render('users/login');
   },
 
   processLogin: function (req, res) {
     const errors = validationResult(req);
 
     //if (errors.isEmpty()){
     //esto funciona como un find. elemento representa a un usuario dentro del array de usuarios en data.
     //const user = req.body.user
 
     //cree la const user, para almacenar todos los campos del objeto req body y poder usarlos para ver si la pass q ingresa el usuario coincide con la almacenada o no
     Users.findOne({
       where: {
         email: req.body.email,
       },
     }).then(function (usuarioEncontrado) {
       //si el usuario existe en la DB:
       if (usuarioEncontrado) {
         //verifico la contraseña..
         if (bcrypt.compareSync(req.body.password, usuarioEncontrado.password)) {
           let user = usuarioEncontrado
           //     //guardo el usuario en session
           //         //borro la contraseña pq es info sensible y no se guarda en session
           //    delete user.password;
           req.session.user = user; //aca guardamos el usuario a loguearse
           //     // return res.send(user)
 
           if (req.body.remember) {
             res.cookie('email', user.email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
           }
           return res.redirect('/');
       } else {
           //si la contraseña ingresada no existe, le digo que no existe (el usuario si existe)
           //acá le tenemos que poner las validaciones
           return res.render('users/login', { errors: errors.mapped(), old: req.body })
             .catch(error => console.log(error))
         }
       } else {
         //si el usuario no existe, por que el mail no está en la DB, lo mando al register
         // return res.render('register');
         return res.render('users/login', { errors: errors.mapped(), old: req.body })
           .catch(error => console.log(error))
       } 
 });
 
   },
    logout: function (req, res) {
       req.session.destroy();
 
       if (req.cookies.email) {
         res.clearCookie('email');
       }
 
       return res.redirect('/');
 },
 
     profile: function (req, res) {
  
       Users.findByPk(req.params.id, {
         include: {
           all: true
         }
       })
         .then(user => {
           return res.render('profile', { user });
         })
 }
        
 };
 module.exports = controller;