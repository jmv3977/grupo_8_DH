// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const registerController = require('../controllers/registerController');

/*** CREATE ONE PRODUCT ***/ 
router.get('/', registerController.create); /* GET - Form to create */
router.post('/', registerController.store); /* POST - Store in DB */



module.exports = router;