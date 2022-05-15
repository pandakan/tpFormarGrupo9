const express = require('express');
const router = express.Router()   
const usersController = require('../controllers/usersController');
const registerValidator = require("../validations/registerValidator");
const uploadAvatar = require("../middlewares/uploadAvatar");
const loginValidator = require('../validations/loginValidator');
const userInSessionCheck = require("../middlewares/userInSessionCheck")

router.get('/login', userInSessionCheck, usersController.login);

router.post("/login", loginValidator, usersController.processLogin);

router.get('/registro', userInSessionCheck, usersController.register);

router.post("/registro", uploadAvatar.single("avatar"), registerValidator,usersController.processRegister);

router.get("/logout", usersController.logout);

module.exports = router;