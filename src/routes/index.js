const express = require('express');
const router = express.Router();


//res.sendFiles- enviar archivos como respuesta
router.get('/', (req, res) => {
//clase titulo
    res.render('index', { title: 'YinsBot' });
});



module.exports = router;