const {check, body} = require("express-validator");
//const { getUsers } = require("../data")
const bcrypt = require("bcryptjs");
const db = require("../database/models");

let userEditPasswordValidator = [
    check("oldPassword")
        .notEmpty().withMessage("Ingrese una contraseña")
        .isLength({ min: 8}).withMessage("La contraseña debe tener por lo menos 8 caracteres"),
    body("oldPassword").custom((value, {req}) => {
        return db.User.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(user => {
            if (!bcrypt.compareSync(req.body.oldPassword, user.password)){
                return Promise.reject()
            }
        })
        .catch(error => {
            return Promise.reject("Contraseña antigua inválida")
        })
    }),
    check("newPassword1")
        .notEmpty().withMessage("Ingrese una contraseña")
        .isLength({ min: 8}).withMessage("La contraseña debe tener por lo menos 8 caracteres"),
    check("newPassword2")
        .notEmpty().withMessage("Reingrese su contraseña"),
    body("newPassword2").custom((value, {req}) => {
        if(value !== req.body.newPassword1){
            return false;
        }
        return true;
    }).withMessage("Las contraseñas no coinciden"),
]

module.exports = userEditPasswordValidator;