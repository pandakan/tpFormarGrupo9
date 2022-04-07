const express = require('express');
const router = express.Router()  


const productosController = require('../controllers/productosControllers');


router.get('/',productosController.getAll)  

router.get('/carrito', productosController.shopCart)


module.exports = router ;