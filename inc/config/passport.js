
const Usuario = require('../usuarios');
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done){
    
        Usuario.getById(id).then(user=>{
            done(null, user);   
        }).catch(err=>{
            done(err);
        });
    
    });
    
    passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    }, function(req, email, senha, done){
        req.checkBody('email', 'Email inválido!').notEmpty().isEmail();
        req.checkBody('senha', 'Senha inválida!').notEmpty().isLength({min: 4});
        let errors = req.validationErrors();
        if(errors){
            let messages = [];
            errors.forEach(error => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }
        Usuario.findOne({email}).then(usuario=>{

            if(usuario){
                return done(null, false, {message: 'Email já está em uso!'})
            }
        
            Usuario.save({nome: req.body.nome, email, senha}).then(novoUsuario=>{
                return done(null, novoUsuario)
            }).catch(err=>{
                return done(err);
            });
    
        }).catch(err=>{
            return done(err);
        });
    }));

    passport.use('local.signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha',
        passReqToCallback: true
    }, function(req, email, senha, done){

        req.checkBody('email', 'Email inválido!').notEmpty().isEmail();
        req.checkBody('senha', 'Senha inválida!').notEmpty();
        let errors = req.validationErrors();
        if(errors){
            let messages = [];
            errors.forEach(error => {
                messages.push(error.msg);
            });
            return done(null, false, req.flash('error', messages));
        }
        Usuario.findOne({email}).then(usuario=>{
            
            if(!usuario){
                return done(null, false, {message: 'Usuário não encontrado!'})
            }
            if(!usuario.validPassword(senha)){
                return done(null, false, {message: 'Senha incorreta!'});
            }

            return done(null, usuario);
            
    
        }).catch(err=>{
            return done(err);
        });

    }));

}