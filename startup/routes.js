const express = require('express');
const inicio = require('../routes/inicio');
const impressao = require('../routes/impressao');
module.exports = function(app) {
    app.use(express.json());
    app.use('/', inicio)
    app.use('/api/impressao', impressao);
}