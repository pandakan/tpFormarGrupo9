const {check} = require("express-validator");

let validateEditCategorie = [
    check("name")
    .notEmpty().withMessage("Debe ingresar un nombre").bail()
    .isAlphanumeric().withMessage("Ingrese un nombre válido")
    .isLength({min: 5}).withMessage("Ingrese un nombre válido")
]

module.exports = validateEditCategorie;