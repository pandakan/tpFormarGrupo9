const express = require('express');
const router = express.Router()  


const productosController = require('../controllers/productosControllers');

router.get('/carrito', productosController.shopCart)

router.get("/detalle/:id", productosController.details)


module.exports = router ;