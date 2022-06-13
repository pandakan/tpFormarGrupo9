const db = require("../../database/models")
const {Op} = db.Sequelize
const { validationResult } = require("express-validator");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const removeAccents = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
    list: (req, res) => {
        db.Product.findAll()
        .then((product) => {
            res.render("admin/products/listProducts",{
                titulo: "Listado de productos",
                product,
                session:req.session
            })
        })
        .catch((error) => { res.send(error)})
    },

    productAdd: (req, res) => {
        res.render("admin/products/addProduct",{
            titulo: "Producto nuevo",
            session:req.session
        })
    },

    productCreate: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Product.create({
                ...req.body,
                image: req.file ? req.file.filename : "default-image.png",
                stock: req.body.stock ? true : false
            })
            .then ((product) =>{
                res.redirect('/admin/productos')
           })
              .catch((error) => res.send(error));
        }
        },

    productEdit: (req, res) => { //product_id

        let idProducto = +req.params.id;

        db.Product.findByPk(idProducto)
        .then((product) => { 
            res.render('admin/products/editProduct', {
                titulo: "Edición",
                product,
                session: req.session
                })
         })
        .catch((error) => {
            res.send(error)
         })
    },

    productUpdate: (req, res) => { 

        let idProducto = +req.params.id;

        db.Product.update({
            name : req.body.name,
            price : req.body.price,
            discount : req.body.discount,
            categoryId : req.body.categoryId,
            projectId : req.body.projectId,
            stock : req.body.stock ? true : false,
            description : req.body.description
        },{
            where: {
                id: idProducto
            }
        })
        .then((result) => {
            if(result){
                res.redirect('/admin/productos')
            }else{
                res.send("Hay un error")
            }
        })
        .catch((error) => { res.send(error)})
    },

    productDelete: (req, res) => {

        let idProducto = +req.params.id;

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
        .catch( error => res.send(error))
    },
    search: (req, res) => {
        let searchResult = req.query.search;
        let search = removeAccents(searchResult.toLowerCase())

        db.Product.findAll({
            where:{
                name:{[Op.like]:`%${search}%`}
            }
        })
        .then(producto=>{

            res.render("admin/products/resultsSearch",{
               titulo: `resultados de ${searchResult}`,
               producto,
               searchResult,
                toThousand,
                session: req.session
             })
        })
        .catch((error) => { res.send(error)})
    }
}


