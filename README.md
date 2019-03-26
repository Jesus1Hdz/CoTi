# CoTi a partir de [BotMessengerTemplate](https://github.com/Jesus1Hdz/BotMessengerTemplate)
### Nodejs en el backend y bootstrap en el frontend
___
- Requerimientos
"Nodejs, npm, ngrok"
- Instalando herramientas de trabajo
```
    sudo apt-get install npm
    
    sudo apt-get install node
```

Ngrok, puede ser descargado desde su paǵina oficial.
[Descargar](https://ngrok.com/download)

- Modulos de Node requeridos
Express, ejs, nodemon, morgan, chalk
___
- Instalando node_modules requeridos
```
    npm i express

    npm i ejs

    npm i nodemon -D

    npm i morgan
    
    npm i chalk

```
___
- Ejecutar ngrok en la carpeta del proyecto con el protocolo http y el puerto 2912
```
    ./ngrok http 2912
```
___
- Correr el servidor local express
```
    npm run coti
```
