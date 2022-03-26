const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {   
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/productDetail', function(req, res){
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
});

app.get('/productCart', function(req, res){
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
});

app.get('/formularios', function(req, res){
    res.sendFile(path.join(__dirname, '/views/formularios.html'));
});

app.get('/login', function(req, res){
    res.sendFile(path.join(__dirname, '/views/login.html'));
});
app.get('/carritoDeCompras', function(req, res){
    res.sendFile(path.join(__dirname, '/views/carritoDeCompras.html'));
});

app.listen(PORT, function(){
    console.log("Servidor levantado en el puerto: " + PORT);
});
