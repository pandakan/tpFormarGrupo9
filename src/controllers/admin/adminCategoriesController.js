const { getCategories, writeCategories } = require('../../data');
const { validationResult } = require("express-validator");

const removeAccents = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
    list: (req, res) => {
        res.render('admin/categories/listCategories', {
            titulo: "Listado de productos",
            categorias: getCategories,
            session: req.session
        })
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
            let lastId = 0;
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

            res.redirect('/admin/categorias');
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

        let category = getCategories.find(category => category.id === idCategory)

        res.render('admin/categories/editCategory', {
            titulo: "Edición",
            categoria: category,
            session: req.session
        })
    },

    categorieUpdate: (req, res) => {

        let idCategory = +req.params.id;

        getCategories.forEach(category => {
            if(category.id === idCategory){
                category.name = req.body.name
            }
        })

        writeCategories(getCategories);

        res.redirect('/admin/categorias');
    },

    categorieDelete: (req, res) => {

        let idCategory = +req.params.id;

        getCategories.forEach(category => {
            if(category.id === idCategory){

                let categoryToDeleteIndex = getCategories.indexOf(category);

                getCategories.splice(categoryToDeleteIndex, 1)
            }
        })

        writeCategories(getCategories);

        res.redirect('/admin/categorias');
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
