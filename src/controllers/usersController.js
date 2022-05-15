const {getUsers, writeUsers} = require("../data")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
    login: (req, res) => {
        res.render('users/login',{
            session: req.session
        })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let user = getUsers.find(user => user.email === req.body.email) 
            
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                rol: user.rol
            }
            res.locals.user = req.session.user

            res.redirect('/')
    } else {
        res.render("users/login", {
            errors: errors.mapped(),
            session: req.session
        })
    }
    },



    register: (req, res) => {
        res.render('users/registro', {
            session: req.session
        } )

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
                old: req.body,
                session: req.session
            })
        }
    }
}



