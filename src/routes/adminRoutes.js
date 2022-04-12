const express = require('express');
const router = express.Router(); 

const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController')

router.get('/', adminController.index);  

/* Productos */

router.get("/productos", adminProductsController.list)

router.get("/productos/agregar", adminProductsController.productAdd)

router.get("/productos/editar", adminProductsController.productEdit)




module.exports = router