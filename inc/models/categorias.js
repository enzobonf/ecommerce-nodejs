const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schema = new Schema({
    nome: {type: String, required: true},
    sku: {type: String, required: true},
    img: {type: String, required: true},
});

module.exports = mongoose.model('Categorias', schema);