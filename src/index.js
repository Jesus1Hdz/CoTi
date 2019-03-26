//Importar
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var request = require('request');
const path = require('path');
const chalk = require('chalk');


const APP_TOKEN = 'EAAEfMAdbPlABAArZBVnMBS2m52ROiJP1ZCs0pKnO5ab80vZCR5Mz8ggrkowN3MYv5lcDqzbxmFM8092HRaoOaCA0wyHZBE0ZAadxaMV3ptXz2RKQI4tLMnu84bxzU2UKTEX9PcVAnxEUg1D1FroO1lxDGKuGMhcnAZALCI4AB2mVpBeyCy9TFu';

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
	console.log(chalk.magenta('Server runing in the port ', app.get('port')));
});

//Conexion con FB, validacion token
app.get('/webhook', function(req, res){
	
	if (req.query['hub.verify_token'] === 'token_chatbot_coti') {
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
                console.log(chalk.cyan("\n\n####################################################"));
				console.log(chalk.cyan("-----------------------") + chalk.green('STATUS') + chalk.cyan('-----------------------'));

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
	console.log(chalk.yellow('USER-ID :   ' + senderID));
	console.log(chalk.bold('SMS-TEXT:   ' + messageText));

	evaluateMessage(senderID, messageText);
}

//Responder

function evaluateMessage(recipientId, message){
	var finalMessage = '';
	//AYUDA
	if(isContain(message, 'Ayuda')) {
		finalMessage = '¿En que puedo ayudarte? :3';
	}else if(isContain(message, 'ayuda')){
		finalMessage = '¿Que necesitas? :3';
	} else if (isContain(message, 'Help')) {
		finalMessage = 'Dime, en que puedo ayudarte?\nOye...\nYo aún no hablo inglés, :(\nTe agradecería mucho si solo me escribes en español :)';
	} else if(isContain(message, 'help')){
		finalMessage = '¿En que te ayudo?'
	}
	//LOGO
	else if(isContain(message, 'logo')){
		sendMessageImage(recipientId);
		//Para agregar más opciones de respuesta incluir más "else if"...
		//O cambiar por un SWITCH
	}
	else if (isContain(message, 'info')){
		sendMessageTemplate(recipientId);
	}
	// SALUDOS - HOLA
	else if(isContain(message, 'Hola')){
		finalMessage = 'Holaaaaa!!!' + '\n¿Puedo ayudarte en algo :3?';
	}else if(isContain(message, 'HOLA')){
		finalMessage = 'HOLA!! :3'
	}else if(isContain(message, 'hola')){
		finalMessage = 'Hola! :3  oye, ¿puedo ayudarte en algo?';
	}else if(isContain(message, 'Holi')){
		finalMessage = 'Holiwis kiwis! :3' + '\nOye...' + '\nPuedo ayudarte en algo';
	}else if(isContain(message, 'holi')){
		finalMessage = 'Holis ^-^';
	}
	// SALUDOS - DESPEDIDA
	else if(isContain(message, 'ADIOS')){
		finalMessage = 'Adios! ^-^\nCuidate...';
	}else if(isContain(message, 'Adios')){
		finalMessage = 'Hasta pronto... :)\nCuidate';
	}else if(isContain(message, 'adios')){
		finalMessage = 'Bye!!\n:3'
	}
	// HACER
	else if(isContain(message, 'puedes hacer')){
		finalMessage = 'Puedo hacer muchas cosas wuuu';
	}
	// ERES
	else if (isContain(message, 'Que eres')) {
		finalMessage = 'Soy ChatBot ^-^\nSoy un CHatBot\n:3';
	}
	else if(isContain(message, 'que eres')){
		finalMessage = 'Soy un ChatBot automatizado para responderte';
	}else if (isContain(message, 'crush me ama')) {
		finalMessage = 'Nel, no te ama </3';
	}
	// NOMBRE
	else if(isContain(message, 'tienes nombre')){
		finalMessage = 'Yess!';
	}else if(isContain(message, 'tienen nombre')){
		finalMessage = 'ASi es :)';
	}else if(isContain(message, 'Cual es tu nombre')){
		finalMessage = 'Mi nombre es CoTi\nlindo vdd';
	}else if(isContain(message, 'Cual es tu nombre')){
		finalMessage = 'Mi nombre es CoTi\n^-^';
	} else if(isContain(message, 'Como te llamas')){
		finalMessage = 'Me llamo CoTi :3';
	}else if(isContain(message, 'como te llamas')){
		finalMessage = 'Me llamo CoTi';
	}
	// SI
	else if(isContain(message, 'Si')){
		finalMessage = 'Sipi :3';
	}else if (isContain(message, 'si')) {
		finalMessage = 'Siii';
	}
	//FAST
	else if(isContain(message, 'respondes muy rapido')){
		finalMessage = 'Respondo very fast, por que soy un ChatBot';
	}else if(isContain(message, 'Eso fue lento')){
		finalMessage = 'Pero más rapido que tu crush jaja\n</ 3';
	}
	// CHATBOT
	else if(isContain(message, 'Que es un ChatBot')){
		finalMessage = 'Los ChatsBots somos programas desarrollados para responder a todos los mensajes que nos envian.\n\nYo soy un ChatBot de messenger creado por los chicos de TICS del COBAO 31 :(';
	}else if(isContain(message, 'Oye')){
		finalMessage = 'Hey...';
	}
	else if(isContain(message, 'hacer mi tarea')){
		finalMessage = 'Hagalo usted mismo\n :)';
	}else if(isContain(message, 'Ay')){
		finalMessage = ':"3';
	}
	else if(isContain(message, 'beta')){
        finalMessage = 'Es cuando una aplicación aún está en desarrollo, en esta fase aún pude haber errores, es la fase de prueba...';
    }
    else{
		finalMessage = 'HOLA, me llamo COTI, soy az un un Robot automatizado para responderte y ayudate, aún estoy en desarrollo y por el momento solo repito lo que me envias : "' + message + '"';
	}

	sendMessageText(recipientId, finalMessage);
		console.log(chalk.bgCyan.black(finalMessage));

}
// Agregar formato V de Gowin :3
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
			console.log(chalk.red('\n\nNo es posible enviar el mensaje'));
			console.log(chalk.cyan("####################################################"));
		}else{
			console.log(chalk.cyan('---------------') + chalk.green('El mensaje fue enviado') + chalk.cyan('---------------'));
			//console.log("--------------------------------");
			console.log(chalk.cyan("####################################################"));
			console.log(chalk.magenta('\n\nServer runing in the port ', app.get('port')));
			//console.log(chalk.blue('HolaMundo!'));
		}
	});

}

function isContain(sentence, word){
	return sentence.indexOf(word) > -1;
}

