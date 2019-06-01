const Usuario = require('../models/Usuario')
module.exports = async function(cpf){
    let status = null;
    let usuario = await Usuario.findOne({ cpf: { $in: cpf } })
    if (usuario) {
        status = usuario
    }
    return status
}