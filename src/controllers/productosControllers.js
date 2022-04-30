const { getProducts } = require('../data'); 

module.exports = {
    shopCart: (req, res) => {   
        res.render('products/productCart')
    },
    details: (req,res) => {
        let productId = +req.params.id;
        let product = getProducts.find(product => product.id === productId);
        res.render("products/productDetail",{
            product,
            productos: getProducts,
        })
    }

}