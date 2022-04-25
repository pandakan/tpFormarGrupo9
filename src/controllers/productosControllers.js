
const {getProduct} = require('../data'); 

module.exports = {

    /*  getAll: (req,res) => {
        res.set({"content-type":"text/plain;charset=utf-8"})  
        getProduct.forEach(element => {
        res.write(`${element.name}\n`)
        res.write(`${element.price}\n`)
        res.write(`${element.description}\n`)
        res.write(`${element.discount}\n`)
        res.write(`${element.categoryId}\n`)
        res.write(`${element.proyectId}\n`)
        res.write(`${element.image}\n`)
        res.write(`${element.stock}\n`) 

            res.end()}) 
    }, */
    shopCart: (req, res) => {   
        res.render('productCart')
    },
    getAll: (req,res) => {
        res.render("productDetail")
    }

}