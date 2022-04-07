const express = require("express");
const app = express();
const path = require("path");
const process = require('process');
require('dotenv').config(); 
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.set("view engine", "ejs")

app.set("views", path.join(__dirname, "views"))


                  /* Enrutadores */


const indexRouter = require('./routes/indexRoutes');

const productosRouter = require ('./routes/productosRoutes');

const formularioRouter = require ('./routes/formularioRoutes');



 app.use('/', indexRouter)   

 app.use('/formulario', formularioRouter)
 
 app.use('/productos', productosRouter)
  
  app.listen(PORT, () => {
    console.log(`servidor activo en puerto ${PORT}
    http://localhost:${PORT}`);
  }); 