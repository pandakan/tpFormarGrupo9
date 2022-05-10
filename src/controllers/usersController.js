const req = require("express/lib/request")

module.exports = {

    login: (req, res) => {
        res.render('users/login')
    },
    processLogin: (req, res) => {
        res.send("Estamos ingresando")
    },

    register: (req, res) => {
        res.render('users/registro')
    },
    processRegister: (req, res) => {
        res.send("Estamos registrandote")
    }
}



