const { getProducts } = require('../data'); 

module.exports = {
    shopCart: (req, res) => {   
        res.render('products/productCart',{
            session: req.session
        })
    },
    details: (req,res) => {
        let productId = +req.params.id;
        let product = getProducts.find(product => product.id === productId);
        res.render("products/productDetail",{
            product,
            productos: getProducts,
            session: req.session
        })
    }

}