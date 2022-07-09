const { check, body } = require("express-validator");
//const {getUsers} = require("../data");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

let validateLogin = [
    check("email")
        .notEmpty().withMessage("Debe ingresar un email").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("custom").custom((value, { req }) => {
        return db.User.findOne({
            where: {
                email: req.body.email,
            }
        })
        .then(user => {
            if (!bcrypt.compareSync(req.body.password, user.password)){
                return Promise.reject()
            }
        })
        .catch(error => {
            return Promise.reject("Email o contraseña incorrecto")
        })
    }),
    check("password")
        .notEmpty().withMessage("Ingrese una contraseña")
];

module.exports = validateLogin;