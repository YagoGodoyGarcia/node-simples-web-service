const mongoose = require('mongoose')

//Criando Schema do Pet
const Usuario = mongoose.model('Usuario', new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    Telefone: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        require: true,
    },
    DataNasc: {
        type: String,
        require: true,
    },
    RG: {
        type: String,
        require: true,
    },
    Status: {
        type: String,
        require: true,
    },
    Senha: {
        type: String,
        require: false,
    },
    Conta: {
        Agencia: {
            type: String,
            require: false,
        },
        Numero: {
            type: String,
            require: false,
        },
        Cartao: {
            Numero: {
                type: String,
                require: false,
            },
            DataExp: {
                type: String,
                require: false,
            },
            CodigoSeg: {
                type: String,
                require: false,
            },
            Status: {
                type: String,
                require: false,
            }
        },
        Transferencias: [
            {
                Data: {
                    type: String,
                    require: false,
                },
                Hora: {
                    type: String,
                    require: false,
                },
                Status: {
                    type: String,
                    require: false,
                },
                NomeDestino: {
                    type: String,
                    require: false,
                },
                CpfDestino: {
                    type: String,
                    require: false,
                },
                BancoDestino: {
                    type: String,
                    require: false,
                },
                AgenciaDestino: {
                    type: String,
                    require: false,
                },
                ContaDestini: {
                    type: String,
                    require: false,
                },
                Valor: {
                    type: String,
                    require: false,
                }
            }
        ]
    }
}, { timestamps: true }));

module.exports = Usuario

