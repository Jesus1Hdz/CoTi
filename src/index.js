//Importar
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var request = require('request');
const path = require('path');

const APP_TOKEN = 'EAAH8FvLlHLoBAFeTACIbDeMkQDZAI9IJujejeLoKj6kpLmdKVUZBTdwZCZBrOO8mqZCKQBzDQYZCrZCICJmb4XCUr8JLLafuhwkn2cuWNwpblzIQuIgWwjPdYgOcU0HZCNV1DOSXK5VcZCpI6VPvBQZAUPvZBp5jlqZC5NSZABWzLlrbb3wZDZD';

//Usar bodyParser.json
app.use(bodyParser.json());

//Puerto del servidor
app.set('port', 2912);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

//Config ruta
app.use(require('./routes/index'));

// Archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//POrt especific
app.listen(app.get('port'), () => {
    console.log('Server runing in the port ', app.get('port'));
});

//Conexion con FB, validacion token
app.get('/webhook', function(req, res){
	
	if (req.query['hub.verify_token'] === 'token_secret_jesus') {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Tu no debes de entrat aquí');
	}

});


//Validar eventos
app.post('/webhook', function(req, res){

    var data = req.body;
    if (data.object == 'page'){

        data.entry.forEach(function(pageEntry){
            pageEntry.messaging.forEach(function(messagingEvent){
                console.log("  ");
                console.log("  ");
                console.log("######################");
                console.log("--------STATUS--------");

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
	}else if(isContain(message, 'si')){
	    finalMessage = '¿En que puedo ayudarte?';
    }else if(isContain(message, 'gracias')){
	    finalMessage = 'De nada... :)';
    }else if(isContain(message, 'nombre')){
        finalMessage = 'Mi nombre es CoTi, ¿y el tuyo?';
    }else  if(isContain(message, 'hicieron')){
        finalMessage = 'Me desarrollaron los chicos de TICS, ¿Te gustaria unirte a TICS?';
    }else if(isContain(message, 'eres')){
        finalMessage = 'Soy un ChatBot automatizado para responderte por messenger, aún estoy en fase "beta"';
    }else if(isContain(message, 'beta')){
        finalMessage = 'Es cuando una aplicación aún está en desarrollo, en esta fase aún pude haber errores, es la fase de prueba...';
    }
    else{
		finalMessage = 'HOLA, me llamo COTI, soy un un Robot automatizado para responderte y ayudate, aún estoy en desarrollo y por el momento solo repito lo que me envias : "' + message + '"';
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

//Rsponder si
function sendMessageSi(recipientId, message){
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
            console.log('El mensaje fue enviado');
            console.log("----------------------");
            console.log("######################");
		}
	});

}

function isContain(sentence, word){
	return sentence.indexOf(word) > -1;
}

