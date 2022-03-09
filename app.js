const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req, res) {   
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(PORT, function(){
    console.log("Servidor levantado en el puerto: " + PORT);
})
