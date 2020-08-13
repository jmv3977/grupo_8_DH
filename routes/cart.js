const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authtMiddleware = require('../middlewares/auth');

router.get('/', authtMiddleware, cartController.index);

router.post('/addToCart', cartController.addToCart);

router.post('/delete', cartController.destroy);

router.post('/purchase', cartController.purchase);

router.get('/history', cartController.history)

module.exports = router;