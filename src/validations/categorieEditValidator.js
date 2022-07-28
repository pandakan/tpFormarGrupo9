const {check} = require("express-validator");

let validateEditCategorie = [
    check("name")
    .notEmpty().withMessage("El campo nombre es requerido").bail()
    .isAlphanumeric('en-US', {ignore: ' '}).withMessage("Ingrese un nombre sin numeros o caracteres especiales")
    .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres")
]

module.exports = validateEditCategorie;