const mongoose = require('mongoose');

module.exports = function() {
    const db = 'mongodb://admin:admin123@ds034208.mlab.com:34208/db-ezibank'
    mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then( () => console.log('Connectado ao MongoDB...'))
}