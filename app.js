// verificando o log heroku
// heroku instalado no computador.
// heroku  logs --app=ds403 --tail
const path = require('path');
const db = require("./db");

var express = require('express'),
    app     = express(),
    server  = require('http').Server(app),
    io      = require('socket.io')(server),
    port    =  process.env.PORT || 8888;

const fs = require('fs');



app.use(express.static(path.join(__dirname, 'www')));


app.get('/1', function (req,res) {
    (async () => {
        const client = await db.connect();
        console.log('Começou!');
        const clientes = await db.selectData(res,client);
        // release connection
        client.release();
        console.log(clientes);   
        })();
      console.log("passou");   
//    res.end('alo');    
});

app.get('/', function (req,res) {
    
    //res.sendFile('/index.html');

    fs.readFile( '/index.html','utf-8', function (err,data) {
        if (err){
            res.writeHead(500);
            return res.end('Erro ao carregar a pagina');
        }
        res.writeHead(200, {'Content-Type':"text/html; charset=utf-8"});
        var result = data;
        res.end(result);
    });
    
});


server.listen(port, ()=> console.log('Escutando na porta '+ port));