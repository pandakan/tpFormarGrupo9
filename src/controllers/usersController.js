const {getUsers, writeUsers} = require("../data")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
        let errors = validationResult(req);

        let lastId = 0;
        if(errors.isEmpty()){
            getUsers.forEach(user => {
                if (user.id > lastId) {
                    lastId = user.id;
                }
            });

            let newUser = {
                id: lastId + 1,
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file ? req.file.filename : "default-image.png",
                rol: "user"
            }

            getUsers.push(newUser);

            writeUsers(getUsers);

            res.redirect("/users/login");
        } else {
            res.render("users/registro", {
                errors: errors.mapped(),
                old: req.body
            })
        }
    }
}



