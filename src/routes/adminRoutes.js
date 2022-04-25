const express = require('express');
const router = express.Router(); 

const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');

router.get('/', adminController.index);  

/* CRUD Productos */

router.get("/productos", adminProductsController.list);

router.get("/productos/agregar", adminProductsController.productAdd);

router.post("/productos", adminProductsController.productCreate)

router.get("/productos/editar/:id", adminProductsController.productEdit);

router.put('/productos/:id', adminProductsController.productUpdate);

router.delete('/productos/eliminar/:id', adminProductsController.productDelete);

module.exports = router