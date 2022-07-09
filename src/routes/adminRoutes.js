const express = require('express');
const router = express.Router(); 

const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const adminCategoriesController = require('../controllers/admin/adminCategoriesController');
const uploadImageFile = require("../middlewares/uploadProductImage")
const productCreateValidator = require("../validations/productCreateValidator");
const categorieCreateValidator = require("../validations/categorieCreateValidator");
const categorieEditValidator = require("../validations/categorieEditValidator");
const productEditValidator = require("../validations/productEditValidator");
const userSessionCheck = require("../middlewares/userSessionCheck");
const adminCheck = require("../middlewares/adminCheck");

router.get('/', userSessionCheck, adminCheck, adminController.index);  

/* CRUD Productos */

router.get("/productos", userSessionCheck, adminCheck, adminProductsController.list);

router.get("/productos/agregar", userSessionCheck, adminCheck, adminProductsController.productAdd);

router.post("/productos", uploadImageFile.single("image"), productCreateValidator ,adminProductsController.productCreate)

router.get("/productos/editar/:id", userSessionCheck, adminCheck, adminProductsController.productEdit);

router.put('/productos/:id', uploadImageFile.single("image"), productEditValidator, adminProductsController.productUpdate);

router.delete('/productos/eliminar/:id', adminProductsController.productDelete);

router.get("/productos/search", userSessionCheck, adminCheck, adminProductsController.search);

/* CRUD Categorias */

router.get("/categorias", userSessionCheck, adminCheck, adminCategoriesController.list);

router.get("/categorias/agregar", userSessionCheck, adminCheck, adminCategoriesController.categorieAdd);

router.post("/categorias", categorieCreateValidator ,adminCategoriesController.categorieCreate)

router.get("/categorias/editar/:id", userSessionCheck, adminCheck, adminCategoriesController.categorieEdit);

router.put('/categorias/:id', categorieEditValidator, adminCategoriesController.categorieUpdate);

router.delete('/categorias/eliminar/:id', adminCategoriesController.categorieDelete);

module.exports = router;