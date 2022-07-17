const {check} = require("express-validator");

let validateEditProduct = [
    check("name")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isAlphanumeric('en-US', {ignore: ' '}).withMessage("Ingrese un nombre sin numeros o caracteres especiales")
        .isLength({min: 5}).withMessage("Ingrese un nombre con 5 letras o más"),
    check("price")
        .notEmpty().withMessage("Ingrese un precio").bail()
        .isNumeric().withMessage("Sólo se admiten números"),
    check("categoryId")
        .notEmpty().withMessage("Debe elegir una categoría").bail(),
]

module.exports = validateEditProduct;