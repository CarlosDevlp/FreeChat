//declaraciones
var express = require('express');
var app = express();
var path    = require("path");
var bodyParser = require('body-parser');
var multer = require('multer'); 
var mariadb=require(__dirname+'/dao.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);//socket
//use
app.use(express.static(__dirname +'')); 
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

//petición por get
app.get("/",function(req,res){	 
	if(req.query.pag=="home")
		res.sendFile(path.join(__dirname + "/portada.html"));					
	else		
		res.sendFile(path.join(__dirname + "/index.html"));

});

app.get("/home",function(req,res){	
	if(req.query.pag=="home")
		res.sendFile(path.join(__dirname + "/portada.html"));					
	else
		res.sendFile(path.join(__dirname + "/index.html"));
});



//petición por post
app.post("/sendmsj",function(req, res){	
	switch(req.body.request){
		case "emisor":			
				Dao.insert(req.body.emisor,req.body.msj);							
			res.send("Envio de mensaje de manera satisfactoria");	
		break;
		case "receptor":
			
			var data;
			
				Dao.select(function(result){
					Dao.result=result;													
				});	
				data=Dao.result;
			res.send(data);						
		break;
	}
	
});

http.listen(8080);
//console.log("mi servidor, mio de mi");
//Sockets

io.sockets.on('connection', function(socket){
  	console.log('Usuario conectado');
  	socket.on('emision',function(resp){//dispara para todos los sockets
  		var a;
  		Dao.insert(resp.emisor,resp.msj);//manda el mensaje a la base de datos
  		Dao.select(function(result){  			
			io.sockets.emit('recepcion',result);
  		});
  		  	
  	})
});

/*Creado por carlos chavez laguna*/

/*
---Nota1:
		cuando le envias archivos que el navegador no puede abrir,
		este te lo descarga		
		res.sendFile(path.join(__dirname + "/CTPL.zip"));	
*/