module.exports={
    list: (req, res) => {
        res.render('admin/products/listProducts')
    },
    productAdd:(req, res) => {
        res.render('admin/products/addProduct')
    },
    productEdit:(req, res) => {
        res.render('admin/products/editProduct')
    }
}