const {check, body} = require("express-validator");
const { getUsers } = require("../data")

let validateRegister = [
    check("name")
        .notEmpty().withMessage("Debe ingresar un nombre").bail()
        .isLength({ min: 2}).withMessage("Ingrese un nombre válido"),
    check("email")
        .notEmpty().withMessage("Debe poner un email").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("email").custom((value)=>{
        let user = getUsers.find(user => user.email === value);
        if(user){
            return false;
        }
        return true;
    }).withMessage("Email ya registrado"),
    check("password")
        .notEmpty().withMessage("Ingrese una contraseña")
        .isLength({ min: 8}).withMessage("La contraseña debe tener por lo menos 8 caracteres"),
    check("password2")
        .notEmpty().withMessage("Reingrese su contraseña"),
    body("password2").custom((value, {req}) => {
        if(value !== req.body.password){
            return false;
        }
        return true;
    }).withMessage("Las contraseñas no coinciden"),
    check("check")
        .isString("on").withMessage("Debes aceptar los términos y condiciones")
]

module.exports = validateRegister;