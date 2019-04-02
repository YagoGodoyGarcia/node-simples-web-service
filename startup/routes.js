const express = require('express');
const inicio = require('../routes/inicio');
const receber = require('../routes/receber');
module.exports = function(app) {
    app.use(express.json());
    app.use('/', inicio)
    app.use('/api/teste', receber);
}