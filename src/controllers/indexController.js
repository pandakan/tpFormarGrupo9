const { getProducts } = require('../data'); 
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}
const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports ={
    index: (req, res) => {   
        db.Product.findAll({
            include: [{ association: 'productImages' }],
        })
        .then(products => {
            res.render("index", {
                productos: products,
                session: req.session
            })
        })
        .catch(error => res.send(error));
        /*res.render('index',{
            productos: getProducts,
            session: req.session
        })*/
    },
    search: (req, res) => { 

        let buscado = req.query.Busqueda.toLowerCase();

        db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: buscado
                }
            },
            include: [{ association: "productImages" }]
        })
        .then(productos => {
            res.render('search', {
                productos, 
                busqueda: req.query.Busqueda,
                session: req.session
            })
        })
        .catch(error => res.send(error));

        /*let buscador = [];
        getProducts.forEach(producto => {
            if (removeAccents(producto.name.toLowerCase()).includes(req.query.Busqueda.toLowerCase()) ) {
                buscador.push(producto)
                
            }
            
        });
        res.render('search', {
            buscador, 
            busqueda: req.query.busqueda,
            session: req.session


        })*/

    }
}