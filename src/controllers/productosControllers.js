const { getProducts } = require('../data'); 
const db = require('../database/models');
const { promiseImpl} = require('ejs');

module.exports = {
    shopCart: (req, res) => {   
        res.render('products/productCart',{
            session: req.session
        })
    },
    details: (req,res) => {

        let productId = +req.params.id;

        const productPromise = db.Product.findByPk(productId);
        const imagesPromise = db.ProductImage.findAll({
            where: {
                product_id: productId
            }
        })
        promiseImpl.all([productPromise, imagesPromise])
            .then(([productPromise, imagesPromise]) => {
                res.render("products/productDetail",{
                    product: productPromise,
                    image: imagesPromise,
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