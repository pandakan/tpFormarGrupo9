//const {getUsers, writeUsers} = require("../data")
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");
const fs = require("fs");
const path = require("path");

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
                rol_id: 2,
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

    profile: (req, res) => {
        let idUser = +req.params.id;

        db.User.findOne({
            where: {
                id: idUser
            }
        })
        .then(user => {
            res.render("users/perfil", {
                user: user,
                session: req.session
            })
        })
    },

    editProfile: (req, res) => {
        let idUser = +req.params.id;

        db.User.findOne({
            where: {
                id: idUser
            }
        })
        .then(user => {
            res.render("users/editProfile", {
                user: user,
                session: req.session
            })
        })
    },

    processEditProfile: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            db.User.update({
                name: req.body.name,
                email: req.body.email,
                adress: req.body.adress,
                city: req.body.city,
                phone: req.body.phone,
                adress_number: req.body.adressNumber,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                if(req.file){
                    db.User.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(user => {
                        if (fs.existsSync(path.join(__dirname, `../../public/images/users/${user.avatar}`))    ) {
                            fs.unlinkSync(path.join(__dirname, `../../public/images/users/${user.avatar}`))
                        } else {
                            console.log('No se encontró el archivo')
                        }
                            db.User.update({
                                avatar: req.file.filename
                            }, {
                                where: {
                                    id: req.params.id
                                }
                            })
                            .then(() => {
                                res.redirect("/users/perfil/" + req.params.id)
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => console.log(error))
                } else {
                    res.redirect("/users/perfil/" + req.params.id);
                }
            })
            .catch(error => res.send(error));
        } else {
            db.User.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                res.render("users/editProfile", {
                    user: user,
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session
                })
            })
            .catch(error => console.log(error));
        }


    },

    editPassword: (req, res) => {
        let idUser = +req.params.id;

        db.User.findOne({
            where: {
                id: idUser
            }
        })
        .then(user => {
            res.render("users/editPassword", {
                user: user,
                session: req.session
            })
        })
        .catch(error => console.log(error));
    },
    
    processEditPassword: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){
            console.log(errors.mapped())
            db.User.update({
                password: bcrypt.hashSync(req.body.newPassword1, 10)
            },{
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/users/perfil/" + req.params.id)
            })
            .catch(error => console.log(error));
        } else {
            db.User.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(user => {
                res.render("users/editPassword", {
                    user: user,
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
            
        }
    },

    logout: (req, res) =>{
        req.session.destroy();

        if (req.cookies.pizzaCookie){
            res.cookie("pizzaCookie", "", {maxAge: -1});
        }

        res.redirect("/");
    },

    deleteAccount: (req, res) => {

        db.User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            res.render("users/deleteAccount", {
                user: user,
                session: req.session
            })
        })
        .catch(error => console.log(error));
    },

    processDeleteAccount: (req, res) => {
        req.session.destroy();

        if (req.cookies.pizzaCookie){
            res.cookie("pizzaCookie", "", {maxAge: -1});
        }

        db.User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (fs.existsSync(path.join(__dirname, `../../public/images/users/${user.avatar}`))    ) {
                fs.unlinkSync(path.join(__dirname, `../../public/images/users/${user.avatar}`))
            } else {
                console.log('No se encontró el archivo')
            }
            db.User.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(() => {
                res.redirect("/")
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
}



