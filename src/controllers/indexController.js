const { getProducts } = require('../data'); 
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

module.exports ={
    index: (req, res) => {   
        res.render('index',{
            productos: getProducts,
            session: req.session
        })
    },
    search: (req, res) => { 
        let buscador = [];
        getProducts.forEach(producto => {
            if (removeAccents(producto.name.toLowerCase()).includes(req.query.Busqueda.toLowerCase()) ) {
                buscador.push(producto)
                
            }
            
        });
        res.render('search', {
           buscador, 
            busqueda: req.query.busqueda,
            session: req.session


        })

    }
}