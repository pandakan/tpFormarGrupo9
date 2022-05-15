const express = require('express');
const router = express.Router()   
const usersController = require('../controllers/usersController');
const registerValidator = require("../validations/registerValidator");
const uploadAvatar = require("../middlewares/uploadAvatar");
const loginValidator = require('../validations/loginValidator');

router.get('/login', usersController.login)

router.post("/login", loginValidator, usersController.processLogin);

router.get('/registro', usersController.register) 

router.post("/registro", uploadAvatar.single("avatar"), registerValidator,usersController.processRegister)

module.exports = router