const { body } = require('express-validator');
//const jsonModel = require('../models/jsonModel');
//const userModel = jsonModel('users')
const { Users, Products } = require('../database/models');
//const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = {
   register:[

      //nombre
      body('name')
      .notEmpty().withMessage('El campo nombre es obligatorio').bail()
      .custom(value => {
          return Users.findOne({
                   where: {
                  name: value
              }
          })
              .then(user =>{
                  if (user){
                      return Promise.reject('Usuario registrado')
                  }
              })

      } ),

      //email
       body('email')
        .notEmpty().withMessage('Este campo es obligatorio').bail()
       .isEmail().withMessage('Debes colocar un email válido').bail() 
           .custom(value =>{
               return Users.findOne({

                   where: {
                       email : value
                   }
               })
                   .then(user => {
                       if (user) {
                           return Promise.reject('Email registrado')
                       }
                   })
      }),
         
          //password
       body('password')
          .notEmpty().withMessage('El campo contraseña es obligatorio').bail()
             .isLength({min:6}).withMessage('Debe tener al menos 6 caracteres').bail()
             .custom((value, { req }) => {
              //    if(value != req.body.retype){
              //     return false
              //    }

              return value == req.body.retype;

             }).withMessage('Las contraseñas no coinciden'),

           //retype password
            body('retype')
            .notEmpty().withMessage('El campo repetir contraseña es obligatorio')

   ],

  login:[
      body('email')
      .notEmpty().withMessage('Este campo es obligatorio').bail()
      .isEmail().withMessage('Debes colocar un email válido').bail() 
      .custom((value, {req}) => {
          return Users.findOne({
              where: {
                  email: value
              }
          })
              .then(user => {
                  if (user) {
                      if (bcrypt.compareSync(req.body.password, user.password)){
                          return true;
                      } else {
                          return Promise.reject('La contraseña y el email no coinciden')
                      }


                  } else {
                      return Promise.reject('La contraseña y el email no coinciden')
                  }
              })
      }),
  ],

   creacion: [

       //nombre
       body('name')
           .notEmpty().withMessage('El campo nombre es obligatorio'),

       // price
       body('price')
           .notEmpty().withMessage('El campo precio es obligatorio').bail()
           .isInt().withMessage('Debes colocar un número valido'),

       // category
         body('category')
               .custom((value, { req }) => req.body.idCategory).withMessage('Debes ingresar una categoría'),

       // image
       body('img')
           .custom((value, { req }) => req.file).withMessage('Debes ingresar una imagen').bail()
           .custom((value, { req }) => {
               const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
               const ext = path.extname(req.file.originalname);
               return acceptedExtensions.includes(ext);
           }).withMessage('Debe tener una extensión válida.')
   ],

   edicion: [

       //nombre
       body('name')
           .notEmpty().withMessage('El campo nombre es obligatorio'),

       // price
       body('price')
           .notEmpty().withMessage('El campo precio es obligatorio').bail()
           .isInt().withMessage('Debes colocar un número valido'),

       // category
       body('category')
           .custom((value, { req }) => req.body.idCategory).withMessage('Debes ingresar una categoría'),

       // image
       body('img')
           .custom((value, { req }) => {
               if(req.file){
                   const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
                   const ext = path.extname(req.file.originalname);
                   return acceptedExtensions.includes(ext);
               }
               return true;
           }).withMessage('Debe tener una extensión válida.')
   ]
}