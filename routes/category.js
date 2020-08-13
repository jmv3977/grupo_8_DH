var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/CategoryController');

router.get('/:id', categoryController.root); /* GET - category */

module.exports = router;