var express = require('express');
var router = express.Router();


const mainController = require('../controllers/mainController.js');
/* GET home page. */
router.get('/', mainController.root); /* GET - home page */
router.get('/search', mainController.search); /* GET - search results */


module.exports = router;