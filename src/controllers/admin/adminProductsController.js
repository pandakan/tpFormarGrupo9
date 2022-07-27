const db = require("../../database/models")
const { Op } = db.Sequelize
const { validationResult } = require("express-validator");
const { promiseImpl } = require('ejs');
const fs = require("fs");
const path = require("path");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
    list: (req, res) => {
        db.Product.findAll()
            .then((product) => {
                res.render("admin/products/listProducts", {
                    titulo: "Listado de productos",
                    productos: product,
                    session: req.session
                })
            })
            .catch((error) => { res.send(error) })
    },

    productAdd: (req, res) => {
        db.Category.findAll()
            .then((categorias) => {
                res.render("admin/products/addProduct", {
                    titulo: "Agregar producto",
                    categorias,
                    session: req.session
                })
            })
            .catch((error) => { res.send(error) });
        /*res.render("admin/products/addProduct",{
            titulo: "Producto nuevo",
            session:req.session
        })*/
    },

    productCreate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Product.create({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                category_id: req.body.categoryId,
                stock: req.body.stock ? true : false
            })
                .then((product) => {
                    db.ProductImage.create({
                        imageName: req.file ? req.file.filename : "default-image.png",
                        product_id: product.id
                    })
                        .then(() => {
                            res.redirect('/admin/productos')
                        })
                        .catch((error) => res.send(error))
                })
                .catch((error) => res.send(error))

            /*db.Product.create({
                ...req.body,
                category_id: req.body.categoryId,
                image: req.file ? req.file.filename : "default-image.png",
                stock: req.body.stock ? true : false
            })
            .then ((product) =>{
                res.redirect('/admin/productos')
            })
            .catch((error) => res.send(error));*/
        } else {
            db.Category.findAll()
                .then((categorias) => {
                    res.render("admin/products/addProduct", {
                        titulo: "Agregar producto",
                        categorias,
                        errors: errors.mapped(),
                        old: req.body,
                        session: req.session
                    })
                })
                .catch((error) => { res.send(error) });
        }
    },

    productEdit: (req, res) => { //product_id

        let idProducto = +req.params.id;

        const allCategoriesPromise = db.Category.findAll()
        const oneProductPromise = db.Product.findByPk(idProducto)
        const oneImagePromise = db.ProductImage.findOne({
            where: {
                product_id: idProducto
            }
        })
        promiseImpl.all([allCategoriesPromise, oneProductPromise, oneImagePromise])
            .then(([allCategoriesPromise, oneProductPromise, oneImagePromise]) => {
                //res.send(oneProductPromise);
                res.render('admin/products/editProduct', {
                    titulo: "Edición",
                    producto: oneProductPromise,
                    categorias: allCategoriesPromise,
                    image: oneImagePromise,
                    session: req.session
                })
            })
            .catch(error => res.send(error));
        /*db.Product.findByPk(idProducto)
        .then((product) => { 
            res.render('admin/products/editProduct', {
                titulo: "Edición",
                producto: product,
                session: req.session
                })
            })
        .catch((error) => {
            res.send(error)
            })*/
    },

    productUpdate: (req, res) => {

        let errors = validationResult(req);
        let idProducto = +req.params.id;

        if (errors.isEmpty()) {
            db.Product.update({
                ...req.body,
                stock: req.body.stock ? 1 : 0
            },{
                where: {
                    id: idProducto
                }
            })
                .then(() => {
                    if(req.file){
                            db.ProductImage.findOne({
                                where: {
                                    product_id: idProducto,
                                }
                            })
                                .then((image) => {
                                    if (fs.existsSync(path.join(__dirname, `../../../public/images/products/${image.imageName}`)) && image.imageName != "default-image.png") {
                                        fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image.imageName}`))
                                    } else {
                                        console.log('No se encontró el archivo')
                                    }

                                    db.ProductImage.destroy({
                                        where: {
                                            product_id: req.params.id,
                                        }
                                    })
                                        .then(() => {
                                            db.ProductImage.create({
                                                imageName: req.file.filename,
                                                product_id: req.params.id
                                            })
                                                .then(() => {
                                                    res.redirect('/admin/productos')
                                                })
                                                .catch((error) => console.log(error))
                                        })
                                        .catch((error) => console.log(error))
                                })
                                .catch((error) => console.log(error)) 
                    } else {
                        res.redirect('/admin/productos')
                    }
                })
                .catch((error) => console.log(error))


        } else {
            let idProducto = +req.params.id;

            const allCategoriesPromise = db.Category.findAll()
            const oneProductPromise = db.Product.findByPk(idProducto)
            const oneImagePromise = db.ProductImage.findOne({
            where: {
                product_id: idProducto
                }
            })
            promiseImpl.all([allCategoriesPromise, oneProductPromise, oneImagePromise])
                .then(([allCategoriesPromise, oneProductPromise, oneImagePromise]) => {
                    //res.send(oneProductPromise);
                    res.render('admin/products/editProduct', {
                        titulo: "Edición",
                        producto: oneProductPromise,
                        categorias: allCategoriesPromise,
                        image: oneImagePromise,
                        session: req.session,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(error => console.log(error));

        }


        /*let idProducto = +req.params.id;

        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category_id: req.body.categoryId,
            stock: req.body.stock ? true : false,
            description: req.body.description
        }, {
            where: {
                id: idProducto
            }
        })
            .then((result) => {
                if (result) {
                    res.redirect('/admin/productos')
                } else {
                    res.send("Hay un error")
                }
            })
            .catch((error) => { res.send(error) })*/
    },

    productDelete: (req, res) => {

        let idProducto = +req.params.id;

        db.ProductImage.findAll({
            where: {
                product_id: idProducto,
            }
        })
            .then((images) => {
                let imageNames = images.map(image => image.imageName);

                imageNames.forEach(image => {
                    if (fs.existsSync(path.join(__dirname, `../../../public/images/products/${image}`)) && image != 'default-image.png') {
                        fs.unlinkSync(path.join(__dirname, `../../../public/images/products/${image}`))
                    } else {
                        console.log("-- No se encontró el archivo");
                    }
                });

                db.ProductImage.destroy({
                    where: {
                        product_id: idProducto,
                    }
                })
                    .then(() => {
                        db.Product.destroy({
                            where: {
                                id: idProducto
                            }
                        })
                        .then((result) => {
                            if(result){
                                res.redirect('/admin/productos')
                            }else{
                                res.send("No se pudo eliminar")
                            }
                        })
                        .catch( error => console.log(error))
                    
                    })
                    .catch(error => console.log(error))
            })
            .catch((error) => console.log(error))

        /*db.Product.destroy({
            where: {
                id: idProducto
            }
        })
        .then((result) => {
            if(result){
                res.redirect('/admin/productos')
            }else{
                res.send("No se pudo eliminar")
            }
        })
        .catch( error => res.send(error))*/
    },
    search: (req, res) => {
        let searchResult = req.query.keywords;
        let search = removeAccents(searchResult.toLowerCase())

        db.Product.findAll({
            where: {
                name: { [Op.like]: `%${search}%` }
            }
        })
            .then(producto => {

                res.render("admin/products/resultsSearch", {
                    titulo: `resultados de ${searchResult}`,
                    searchResult: producto,
                    busqueda: req.query.keywords,
                    toThousand,
                    session: req.session
                })
            })
            .catch((error) => { res.send(error) })
    }
}


