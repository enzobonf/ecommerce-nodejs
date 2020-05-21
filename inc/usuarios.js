const db = require('./db');
const Usuario = require('./models/usuarios');

module.exports = {

    save(usuario){

        return new Promise((resolve, reject)=>{

            let novoUsuario = new Usuario({
                nome: usuario.nome,
                email: usuario.email,
                senha:  Usuario.encryptPassword(usuario.senha)
            });

            novoUsuario.save().then(response=>{
                resolve(response);
            }).catch(err=>{
                reject(err);
            });

        });

    },

    getAll(){

        return new Promise((resolve, reject)=>{

            Usuario.find().lean().exec().then(usuarios=>{
                resolve(usuarios);
            }).catch(err=>{
                reject(err);
            });

        })

    },

    getById(id){

        return new Promise((resolve, reject)=>{

            Usuario.findById(id, function(err, usuario){

                if(err) return reject(err);
                
                return resolve(usuario);

            });


        })

    },

    findOne(params){

        return new Promise((resolve, reject)=>{

            Usuario.findOne(params, function(err, usuario){

                if(err) return reject(err);

                return resolve(usuario);

            });


        })

    }

}
