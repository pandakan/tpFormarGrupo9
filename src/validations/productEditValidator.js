const {check} = require("express-validator");

let validateEditProduct = [
    check("name")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isAlphanumeric().withMessage("Ingrese un nombre válido")
        .isLength({min: 5}).withMessage("Ingrese un nombre válido"),
    check("price")
        .notEmpty().withMessage("Ingrese un precio").bail()
        .isNumeric().withMessage("Sólo se admiten números"),
    check("categoryId")
        .notEmpty().withMessage("Debe elegir una categoría").bail(),
]

module.exports = validateEditProduct;