//const {getUsers, writeUsers} = require("../data")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

module.exports = {
    login: (req, res) => {
        res.render('users/login',{
            session: req.session
        })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){

            db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    rol: user.rol_id
                }

                if (req.body.remember) {
                    const TIME_IN_MILISECONDS = 60000;
                    res.cookie("pizzaCookie", req.session.user, {
                        expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                        httpOnly: true,
                        secure: true
                    });
                }

                res.locals.user = req.session.user

                res.redirect('/')
            })
            .catch(error => res.send(error));
        } else {
            res.render("users/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }

        /*
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

            if (req.body.remember) {
                const TIME_IN_MILISECONDS = 60000;
                res.cookie("pizzaCookie", req.session.user, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                });
            } 

            res.locals.user = req.session.user

            res.redirect('/')*
    } else {
        res.render("users/login", {
            errors: errors.mapped(),
            session: req.session
        })
    }*/
    },



    register: (req, res) => {
        res.render('users/registro', {
            session: req.session
        } )

    },
    processRegister: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            db.User.create({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: req.file ? req.file.filename : "default-image.png",
                rol_id: 1,
            })
            .then(user => {
                res.redirect("/users/login");
            })
            .catch(error => res.send(error));
        } else {
            res.render("users/registro", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }

        /*
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
        }*/
    },
    logout: (req, res) =>{
        req.session.destroy();

        if (req.cookies.pizzaCookie){
            res.cookie("pizzaCookie", "", {maxAge: -1});
        }

        res.redirect("/");
    }
}



