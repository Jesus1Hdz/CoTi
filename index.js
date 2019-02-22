//Iniciar servidor

//IMportar
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

const APP_TOKEN = 'EAAH8FvLlHLoBAFeTACIbDeMkQDZAI9IJujejeLoKj6kpLmdKVUZBTdwZCZBrOO8mqZCKQBzDQYZCrZCICJmb4XCUr8JLLafuhwkn2cuWNwpblzIQuIgWwjPdYgOcU0HZCNV1DOSXK5VcZCpI6VPvBQZAUPvZBp5jlqZC5NSZABWzLlrbb3wZDZD';

//Usar bodyParser.json
var app = express();
app.use(bodyParser.json());

//Puerto del servidor
app.listen(2912, function(){
	console.log("El servidor se encuentra en el pueto 2912");
});

//Config ruta
app.get('/', function(req, res){
	res.send('Bienvenido');
});

//Conexion con FB, validacion token
app.get('/webhook', function(req, res){
	
	if (req.query['hub.verify_token'] === 'token_secret_jesus') {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Tu no debes de entrat aquí');
	}

});


//Vlidar eventos
app.post('/webhook', function(req, res){

	var data = req.body;
	if (data.object == 'page'){

		data.entry.forEach(function(pageEntry){
			pageEntry.messaging.forEach(function(messagingEvent){
				console.log("Entro");

				//Evento de tipo mensage? Yes ->
				if (messagingEvent.message){
				receiveMessage(messagingEvent);
				}
			});
		});
		res.sendStatus(200);
	}
});


//Obtener datos del mensaje
function receiveMessage(event){
	var senderID = event.sender.id;
	var messageText = event.message.text;

	console.log(senderID);
	console.log(messageText);
}


