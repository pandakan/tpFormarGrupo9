const fs = require('fs') 
const path = require('path')

module.exports = {
    getProducts: JSON.parse(fs.readFileSync(path.join(__dirname, '/productos.json'),"utf-8")),
    writeProducts: (data) => {
        fs.writeFileSync(path.join(__dirname, "/productos.json"), JSON.stringify(data));
    },
    getUsers: JSON.parse(fs.readFileSync(path.join(__dirname, '/usuarios.json'),"utf-8")),
    writeUsers: (data) => {
        fs.writeFileSync(path.join(__dirname, "/usuarios.json"), JSON.stringify(data));
    },
    getCategories: JSON.parse(fs.readFileSync(path.join(__dirname, '/categorias.json'),"utf-8")),
    writeCategories: (data) => {
        fs.writeFileSync(path.join(__dirname, "/categorias.json"), JSON.stringify(data));
    }
}