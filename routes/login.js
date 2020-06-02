// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const loginController = require('../controllers/loginController');

/*** CREATE ONE PRODUCT ***/ 
router.get('/', loginController.create); /* GET - Form to create */
router.post('/', loginController.login); /* POST - Store in DB */



module.exports = router;