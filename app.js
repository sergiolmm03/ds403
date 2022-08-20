const path = require('path');

var express = require('express'),
    app     = express(),
    server  = require('http').Server(app),
    io      = require('socket.io')(server),
    port    =  process.env.PORT || 8888;

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'www')));


app.get('/', function (req,res) {
    console.log('Dentro do get');
    res.sendFile('/index.html');
/*
    fs.readFile( '/index.html','utf-8', function (err,data) {
        if (err){
            res.writeHead(500);
            return res.end('Erro ao carregar a pagina');
        }
        res.writeHead(200, {'Content-Type':"text/html; charset=utf-8"});
        var result = data;
        res.end(result);
    });
  */
    
});


server.listen(port, ()=> console.log('Escutando na porta '+ port));