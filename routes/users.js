// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/register', usersController.register); /* GET - home page */
router.post('/register', usersController.processRegister); /* GET - search results */
router.get('/login', usersController.login); /* GET - search results */
//router.post('/login', [
    //check('email').isEmail().withMessage('Email invalido'),
    //check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
//], usersController.processLogin); /* GET - search results */

module.exports = router;
