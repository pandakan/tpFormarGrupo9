//const { getCategories, writeCategories } = require('../../data');
const { validationResult } = require("express-validator");
const db = require("../../database/models");
const removeAccents = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
    list: (req, res) => {

        db.Category.findAll()
        .then(categorias => {
            res.render('admin/categories/listCategories', {
                titulo: "Listado de productos",
                categorias,
                session: req.session
            });
        })
        .catch(error => res.send(error));

        /*res.render('admin/categories/listCategories', {
            titulo: "Listado de productos",
            categorias: getCategories,
            session: req.session
        })*/
    },

    categorieAdd: (req, res) => {
        res.render('admin/categories/addCategory', {
            titulo: "Agregar Categoria",
            session: req.session
        })
    },

    categorieCreate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Category.create({
                name: req.body.name,
            })
            .then(() => { res.redirect('/admin/categorias')} )
            .catch(error => res.send(error));

            /*let lastId = 0;
            getCategories.forEach(category => {
                if(category.id > lastId){
                    lastId = category.id;
                }
            });

            let newCategory = {
                ...req.body, 
                id: lastId + 1,
            }

            getCategories.push(newCategory);

            writeCategories(getCategories);

            res.redirect('/admin/categorias');*/
        } else {
            res.render("admin/categories/addCategory", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            });
        }
        },

    categorieEdit: (req, res) => {
        
        let idCategory = +req.params.id;

        db.Category.findByPk(idCategory)
        .then(categoria => {
            res.render('admin/categories/editCategory', {
                titulo: "Edición",
                categoria  ,
                session: req.session
            })
        })
        .catch(error => res.send(error));


        /*let idCategory = +req.params.id;

        let category = getCategories.find(category => category.id === idCategory)

        res.render('admin/categories/editCategory', {
            titulo: "Edición",
            categoria: category,
            session: req.session
        })*/
    },

    categorieUpdate: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let categoryId = +req.params.id;

        db.Category.update({
            name: req.body.name,
        },{
            where: {
                id: categoryId,
            }
        })
        .then(result => {
            if(result){
                res.redirect('/admin/categorias');
            }else{
                console.log("No se pudo actualizar");
            }
        })
        .catch(error => res.send(error));
        } else {

            let idCategory = +req.params.id;

            db.Category.findByPk(idCategory)
            .then(categoria => {

            res.render("admin/categories/editCategory", {
                categoria: categoria,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            });
            })
            .catch(error => console.log(error));
        }


        

        /*let idCategory = +req.params.id;

        getCategories.forEach(category => {
            if(category.id === idCategory){
                category.name = req.body.name
            }
        })

        writeCategories(getCategories);

        res.redirect('/admin/categorias');*/
    },

    categorieDelete: (req, res) => {

        let idCategory = +req.params.id;

        db.Category.destroy({
            where: {
                id: idCategory,
            }
        })
        .then(result => {
            if(result){
                res.redirect('/admin/categorias');
            }else{
                res.send("No se pudo eliminar");
            }
        })
        .catch(error => res.send(error));

        /*let idCategory = +req.params.id;

        getCategories.forEach(category => {
            if(category.id === idCategory){

                let categoryToDeleteIndex = getCategories.indexOf(category);

                getCategories.splice(categoryToDeleteIndex, 1)
            }
        })

        writeCategories(getCategories);

        res.redirect('/admin/categorias');*/
    },
    /*search: (req, res) => {
        let searchResult = [];
        getProducts.forEach(product => {
            if(removeAccents(product.name.toLowerCase()).includes(req.query.keywords.toLowerCase())){
				searchResult.push(product);
			}
        });

        

        res.render("admin/products/resultsSearch",{
            searchResult,
            keyword: req.query.keywords,
            toThousand,
            session: req.session
        })
    }*/
}
