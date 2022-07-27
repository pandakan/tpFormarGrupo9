const {check, body} = require("express-validator");
//const { getUsers } = require("../data")
const db = require("../database/models");

let validateEditUser = [
    check("name")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isLength({ min: 3}).withMessage("Ingrese un nombre válido"),
    check("email")
        .notEmpty().withMessage("Debe ingresar un email").bail()
        .isEmail().withMessage("Ingrese un email válido"),
]

module.exports = validateEditUser;