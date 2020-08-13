// ************ Require's ************
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validator = require('../middlewares/validator');
const guestMiddleware = require('../middlewares/guest');
const authtMiddleware = require('../middlewares/auth');

//register
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', guestMiddleware, validator.register,  usersController.processRegister);

//login
router.get('/login', guestMiddleware, usersController.login); 
router.post('/login', guestMiddleware, validator.login, usersController.processLogin);

//logout
router.post('/logout', authtMiddleware, usersController.logout);
//router.get('/profile/:id', usersController.profile);

module.exports = router;
