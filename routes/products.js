// ************ Require's ************
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/detail/:productId/', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); /* GET - Form to create */
router.post('/create/', productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.post('/edit/:productId', productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */



module.exports = router;
