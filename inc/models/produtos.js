const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    sku: {type: String, required: true},
    nome: {type: String, required: true},
    descricao: {type: String, required: false},
    preco: {type: Number, required: true},
    img: {type: String, required: true},
    categoria: {type: String, required: false},
});

module.exports = mongoose.model('Produto', schema);