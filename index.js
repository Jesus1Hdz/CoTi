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
				//console.log("Entro");

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

	//Imprimir ID y Mensaje en la terminal
	console.log(senderID);
	console.log(messageText);

	evaluateMessage(senderID, messageText);
}

//Responder

function evaluateMessage(recipientId, message){
	var finalMessage = '';
	//si el mensaje pide ayuda, entonces la enviamos
	if(isContain(message, 'ayuda')) {
		finalMessage = 'Por el momento no puedo ayudarte :3';
		//Mensaje
	}else if(isContain(message, 'logo')){
		sendMessageImage(recipientId);
	}else if () {

	}else{
		finalMessage = 'HOLA, me llamo COBOT, soy un un Robot automatizado para responderte y ayudate, aún estoy en desarrollo y por el momento solo repito lo que me envias : "' + message + '"';
	}

	sendMessageText(recipientId, finalMessage);
}

//Enviar al usuario texto
function sendMessageText(recipientId, message){
	//Estructura del mensaje FB
	var messageData = {
		//Id del destinatario
		recipient : {
			id : recipientId
		},
		//texto
		message: {
			text: message
		}
	};
	callSendAPI(messageData);
}

//Enviar al usuario imagen
function sendMessageImage(recipientId){
	//Estructura del mensaje FB
	//API imgur, buscar por categorias
	var messageData = {
		//Id del destinatario
		recipient : {
			id : recipientId
		},
		//texto
		message: {
			attachment: {
				type: "image",
				payload: {
					url: "https://pbs.twimg.com/profile_images/1063452253166559232/yOKv8ug2_400x400.jpg"
				}
			}
		}
	};
	callSendAPI(messageData);
}

//function sendMessageImage(recipientId){
	//API imgur
//	var messageData = {
		//Id del destinatario
//		recipient : {
//			id : recipientId
//		},
		//texto
//		message: {
//			attachment:{
//				type: "image",
//				payload: {
//					url: "https://pbs.twimg.com/profile_images/1063452253166559232/yOKv8ug2_400x400.jpg"
//				}
//			}
//		}
//	};
//	callSendAPI(messageData);
//}

//Peticion FB con token
function callSendAPI(messageData){

	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs : { access_token : APP_TOKEN},
		method: 'POST',
		json: messageData
	}, function(error, response, data){
		if (error) {
			console.log('No es posible enviar el mensaje');
		}else{
			console.log('El mensaje fue enviado');
		}
	});

}

function isContain(sentence, word){
	return sentence.indexOf(word) > -1;
}




