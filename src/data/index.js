const fs = require('fs') 
const path = require('path')





module.exports = {

    getProduct:  JSON.parse(fs.readFileSync(path.join(__dirname, '/productos.json'),"utf-8")),  


}