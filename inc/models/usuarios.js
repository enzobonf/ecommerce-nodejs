const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

let schema = new Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String, required: true},
});

schema.static('encryptPassword', function(senha){
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(5), null);
});

schema.methods.validPassword = function(senha){
    return bcrypt.compareSync(senha, this.senha)
};

module.exports = mongoose.model('Usuarios', schema);