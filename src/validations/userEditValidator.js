const {check, body} = require("express-validator");
//const { getUsers } = require("../data")
const db = require("../database/models");
const { promiseImpl } = require('ejs');


let validateEditUser = [
    check("name")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isLength({ min: 3}).withMessage("Ingrese un nombre válido"),
    check("email")
        .notEmpty().withMessage("Debe ingresar un email").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("email").custom((value, {req})=>{
        const emailExist = db.User.findOne({
            where: {
                email: value,
            }
        })
        const userEmail = db.User.findOne({
            where: {
                id: req.params.id
            }
        })
        return promiseImpl.all([emailExist, userEmail])
        .then(([emailExist, userEmail]) => {
            if (emailExist && userEmail.email != value){
                return Promise.reject("Email ya registrado")
            }
        })
    }),
]

module.exports = validateEditUser;