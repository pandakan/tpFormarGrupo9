const express = require('express');
const router = express.Router(); 

const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const uploadImageFile = require("../middlewares/uploadProductImage")
const productCreateValidator = require("../validations/productCreateValidator");

router.get('/', adminController.index);  

/* CRUD Productos */

router.get("/productos", adminProductsController.list);

router.get("/productos/agregar", adminProductsController.productAdd);

router.post("/productos", uploadImageFile.single("image"), productCreateValidator ,adminProductsController.productCreate)

router.get("/productos/editar/:id", adminProductsController.productEdit);

router.put('/productos/:id', adminProductsController.productUpdate);

router.delete('/productos/eliminar/:id', adminProductsController.productDelete);

module.exports = router;