const express = require("express");
const app = express();
const path = require("path");
const process = require('process');
require('dotenv').config(); 
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override");

/* Enrutadores */
const indexRouter = require('./routes/indexRoutes');
const productosRouter = require ('./routes/productosRoutes');
const formularioRouter = require ('./routes/formularioRoutes');
const adminRouter = require("./routes/adminRoutes");

app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Views config */
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

/* Rutas */
app.use('/', indexRouter);   
app.use('/formulario', formularioRouter);
app.use('/productos', productosRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`servidor activo en puerto ${PORT}
  http://localhost:${PORT}`);
}); 