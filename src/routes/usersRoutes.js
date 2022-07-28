const express = require('express');
const router = express.Router()   
const usersController = require('../controllers/usersController');
const registerValidator = require("../validations/registerValidator");
const uploadAvatar = require("../middlewares/uploadAvatar");
const loginValidator = require('../validations/loginValidator');
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const userSessionCheck = require("../middlewares/userSessionCheck");
const userEditValidator = require("../validations/userEditValidator");
const userEditPasswordValidator = require("../validations/userEditPasswordValidator");

// Registro y Login de usuarios

router.get('/login', userInSessionCheck, usersController.login);

router.post("/login", loginValidator, usersController.processLogin);

router.get('/registro', userInSessionCheck, usersController.register);

router.post("/registro", uploadAvatar.single("avatar"), registerValidator, usersController.processRegister);

router.get("/logout", usersController.logout);

// Edicion de perfil de usuario

router.get("/perfil/:id", userSessionCheck ,usersController.profile);

router.get("/editProfile/:id", userSessionCheck, usersController.editProfile);

router.post("/editProfile/:id", uploadAvatar.single("avatar"), userEditValidator ,usersController.processEditProfile);

router.get("/editPassword/:id", userSessionCheck, usersController.editPassword);

router.post("/editPassword/:id", userEditPasswordValidator, usersController.processEditPassword);

router.get("/deleteAccount/:id", userSessionCheck, usersController.deleteAccount);

router.delete("/deleteAccount/:id", usersController.processDeleteAccount);

module.exports = router;