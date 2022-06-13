const {check} = require("express-validator");

let validateCategorie = [
    check("name")
    .notEmpty().withMessage("El campo nombre es requerido").bail()
    .isAlphanumeric().withMessage("Ingrese un nombre válido")
    .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres")
]

module.exports = validateCategorie;