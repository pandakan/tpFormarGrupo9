const { getProducts } = require('../data'); 

module.exports ={
    index: (req, res) => {   
        res.render('index',{
            productos: getProducts,
        })
    }
}