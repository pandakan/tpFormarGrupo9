const express = require('express');
const router = express.Router()   


const usersController = require('../controllers/usersController');

/*const loginController = require('../controllers/loginController');*/

router.get('/registro', usersController.register)  

router.get('/login', usersController.login)


module.exports = router