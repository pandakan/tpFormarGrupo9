const { getProducts, writeProducts } = require('../../data');


module.exports = {
    list: (req, res) => {
        res.render('admin/products/listProducts', {
            titulo: "Listado de productos",
            productos: getProducts
        })
    },

    productAdd: (req, res) => {
        res.render('admin/products/addProduct', {
            titulo: "Agregar producto"
        })
    },

    productCreate: (req, res) => {

        let lastId = 0;
        getProducts.forEach(product => {
            if(product.id > lastId){
                lastId = product.id;
            }
        });

        let newProduct = {
            ...req.body, 
            id: lastId + 1,
            image: req.file ? req.file.filename : "default-image.png",
            stock: req.body.stock ? true : false
        }

        getProducts.push(newProduct);

        writeProducts(getProducts);

        res.redirect('/admin/productos');
    
        },

    productEdit: (req, res) => {

        let idProducto = +req.params.id;

        let producto = getProducts.find(producto => producto.id === idProducto)

        res.render('admin/products/editProduct', {
            titulo: "Edición",
            producto
        })
    },

    productUpdate: (req, res) => {

        let idProducto = +req.params.id;

        getProducts.forEach(producto => {
            if(producto.id === idProducto){
                producto.name = req.body.name
                producto.price = req.body.price
                producto.discount = req.body.discount
                producto.categoryId = req.body.categoryId
                producto.projectId = req.body.projectId
                producto.stock = req.body.stock ? true : false
                producto.description = req.body.description
            }
        })

        writeProducts(getProducts);

        res.redirect('/admin/productos');
    },

    productDelete: (req, res) => {

        let idProducto = +req.params.id;

        getProducts.forEach(producto => {
            if(producto.id === idProducto){

                let productToDeleteIndex = getProducts.indexOf(producto);

                getProducts.splice(productToDeleteIndex, 1)
            }
        })

        writeProducts(getProducts);

        res.redirect('/admin/productos')
    },
}
