/* var express = require('express');
var router = express.Router(); */

const params = require('../inc/params');
const produtos = require('../inc/produtos');
const usuarios = require('../inc/usuarios');

const passport = require('passport');

const csrf = require('csurf');
let csrfProtection = csrf();


function getParams(req, params){

    return Object.assign({},{
        categorias: req.categorias,
        csrfToken: req.csrfToken()
    }, params);

}

/* router.use(csrfProtection);

router.use(async function(req, res, next){

    let parameters = await params.get();
    req.categorias = parameters.categorias;

    /* let user = {id: 1, nome: 'Enzo', email: 'enzobonfx@gmail.com', password: 'ca8fc4c4ee8913c0cb7b5b30229ea74b', carrinho: []};
    req.session.user = user;

    next();

});

router.get('/login', function(req, res, next) {

    let messages = ['Erro'];
    res.render('user/login', getParams(req, {body: req.body, messages,  hasErrors: messages.length}));
    
});

router.post('/login', function(req, res, next) {

    res.redirect('/');

});

router.get('/cadastro', function(req, res, next) {

    let messages = ['Erro'];
    res.render('user/cadastro', getParams(req, {messages: messages, hasErrors: messages.length}));
    
});

//require('./../inc/config/passport');

router.post('/cadastro', function(req, res, next) {req.passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/cadastro',
    failureFlash: true
})});
    
router.get('/', function(req, res, next) {

    produtos.getAll().then(produtos=>{

        res.render('index', getParams(req, {produtos}));

    }).catch(err=>{
    
        console.log(err);
        res.send(err);

    });
    
});

router.get('/:sku', function(req, res, next) {

    let sku = req.params.sku;
    
    produtos.getBySku(sku).then(produto=>{
        res.render('product', getParams(req, {produto}));
    }).catch(err=>{
        console.log(err);
        res.send(err);
    });
    
    
});
 */


function loggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

module.exports = function(router){

    router.use(csrfProtection);

    router.use(async function(req, res, next){

        let parameters = await params.get();
        req.categorias = parameters.categorias;

        next();

    });

    router.get('/login', notLoggedIn, function(req, res, next) {

        let messages = req.flash('error')
        res.render('user/login', getParams(req, {body: req.body, messages,  hasErrors: messages.length}));
        
    });

    router.post('/login', passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    router.get('/logout', loggedIn,  function(req, res, next) {

        req.session.destroy(function (err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
        
    });

    router.get('/cadastro', notLoggedIn, function(req, res, next) {

        let messages = req.flash('error');
        console.log(messages);
        
        res.render('user/cadastro', getParams(req, {body: req.body, messages, hasErrors: messages.length}));
        
    });

    //require('./../inc/config/passport');

    router.post('/cadastro', passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/cadastro',
        failureFlash: true
    }));
        
    router.get('/', function(req, res, next) {

        produtos.getAll().then(produtos=>{

            res.render('index', getParams(req, {produtos}));

        }).catch(err=>{
        
            console.log(err);
            res.send(err);

        });
        
    });

    router.get('/:sku', function(req, res, next) {

        let sku = req.params.sku;
        
        produtos.getBySku(sku).then(produto=>{
            res.render('product', getParams(req, {produto}));
        }).catch(err=>{
            console.log(err);
            res.send(err);
        });
        
        
    });


};
