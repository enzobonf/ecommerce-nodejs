var express = require('express');
var router = express.Router();

const carrinho = require('../inc/carrinho');

router.use(async function(req, res, next){

    next();
  
});

router.get('/produto', async function(req, res, next){

    req.session.user.carrinho.push({produto:{id: '1', qnt: '2'}});
    console.log(req.session.user.carrinho);

});

router.post('/produto:id', async function(req, res, next) {
    
    
});

module.exports = router;
