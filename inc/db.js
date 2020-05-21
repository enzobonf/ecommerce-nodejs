const mongoose = require('mongoose');
const credentials = require('./dbCredentials.json');

mongoose.connect('mongodb://localhost:27017/shopping', {user: credentials.user, pass: credentials.password, authSource: 'admin', useNewUrlParser: true, useUnifiedTopology: true});

let db = mongoose.connection;

module.exports = db;