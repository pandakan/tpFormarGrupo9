const express = require('express');
const router = express.Router()   


const formularioController = require('../controllers/formularioController');

/*const loginController = require('../controllers/loginController');*/

router.get('/', formularioController.formulario)  

router.get('/login', formularioController.login)


module.exports = router