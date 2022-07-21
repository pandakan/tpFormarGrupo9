const { promiseImpl } = require('ejs');
const { getProducts } = require('../data'); 
const db = require('../database/models');

module.exports = {
    shopCart: (req, res) => {  
        
        db.Product.findOne({
            where: {
                id: 2
            },
            include: [{ association: "productImages" }]
        })
        .then(product => {
            res.render('products/productCart', {
                product: product,
                session: req.session
            })
        })
        .catch(error => res.send(error))

        /*res.render('products/productCart',{
            session: req.session
        })*/
    },
    details: (req,res) => {

        let productId = +req.params.id;

        const allProductsPromise = db.Product.findAll({
            include: [{ association: 'productImages' }],
        })
        const oneProductPromise = db.Product.findOne({
            where: {
                id: productId
            },
            include: [{ association: "productImages" }]
        })
        promiseImpl.all([allProductsPromise, oneProductPromise])
        .then(([allProductsPromise, oneProductPromise]) => {
            //res.send(oneProductPromise);
            res.render("products/productDetail", {
                
                product: oneProductPromise,
                productos: allProductsPromise,
                session: req.session
            })
        })
        .catch(error => res.send(error));
        

        /*let productId = +req.params.id;
        let product = getProducts.find(product => product.id === productId);
        res.render("products/productDetail",{
            product,
            productos: getProducts,
            session: req.session
        })*/
    }

}