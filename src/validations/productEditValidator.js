const {check} = require("express-validator");

let validateEditProduct = [
    check("name")
        .notEmpty().withMessage("El campo nombre es requerido").bail()
        .isAlphanumeric().withMessage("Ingrese un nombre válido")
        .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres"),
    check("price")
        .notEmpty().withMessage("Ingrese un precio").bail()
        .isNumeric().withMessage("Sólo se admiten números"),
    check("categoryId")
        .notEmpty().withMessage("Debe elegir una categoría").bail(),
]

module.exports = validateEditProduct;