const fs = require('fs') 
const path = require('path')

module.exports = {
    getProducts: JSON.parse(fs.readFileSync(path.join(__dirname, '/productos.json'),"utf-8")),
    writeProducts: (data) => {
        fs.writeFileSync(path.join(__dirname, "/products.json"), JSON.stringify(data));
    },
}