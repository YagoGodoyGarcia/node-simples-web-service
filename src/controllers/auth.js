const express = require('express')

const Usuario = require('../models/Usuario')

const Existencia = require('../services/existencia')

const router = express.Router();
/**
 * @author Yago Garcia
 */

router.post('/registrar', async (req, res) => {
    try {
        let usuario = Existencia(req.body['cpf'])
        usuario.then(async usuario => {
            if (!usuario) {
                usuario = await new Usuario(req.body)
                usuario.save()
            } else {
                return res.status(403).send({ error: 'Cpf ja está registrado' });
            }
            return res.status(201).send({ usuario })
        })
    } catch (err) {
        return res.status(400).send({ err: 'Falha no registro' });
    }
})

router.put('/atualizar', async (req, res) => {
    try {
        let usuario = Existencia(req.body['cpf'])
        usuario.then(async usuario => {
            if (!usuario) {
                usuario = await new Usuario(req.body)
                usuario.save()
            } else {
                usuario = await Usuario.updateOne(
                    { cpf: usuario.cpf },
                    { $set: { 
                        RG: req.body['RG'],
                        Conta:  req.body['Conta']
                    } }
                );
            }
            return res.status(201).send({ usuario })
        })
    } catch (err) {
        return res.status(400).send({ err: 'Falha no registro' });
    }
})

router.post('/pendente', async (req, res) => {
    try {
        let usuario = Existencia(req.body['cpf'])
        usuario.then(async usuario => {
            if (!usuario) {
                usuario = await new Usuario(req.body)
                usuario.save();
            } else {
                return res.status(403).send({ error: 'Cpf ja está registrado' });
            }
            return res.status(201).send({ usuario })
        })
    } catch (err) {
        return res.status(400).send({ err: 'Falha no registro' });
    }
})

router.post('/status', async (req, res) => {
    try {
        let result = Existencia(req.body['cpf'])
        result.then(result => {
            return res.status(200).send(result)
        })
    } catch (err) {
        return res.status(400).send({ error: `Falha na busca: ${err}` });
    }
})

router.post('/transferencia', async (req, res) => {
    try {
        let result = Existencia(req.body['cpf'])
        result.then(async result => {
            var newSaldo = 0
            var newSaldoD = 0
         
            if(req.body['Transferencias']['BancoDestino'] === 'eziBank'){
                let destino = Existencia(req.body['Transferencias']['CpfDestino'])
                destino.then(async destino =>{
                    if(destino){
                        if(destino.Conta.Agencia == req.body['Transferencias']['AgenciaDestino'] 
                        && destino.Conta.Numero ==  req.body['Transferencias']['ContaDestini']){
                            newSaldo = result.Conta.Saldo - req.body['Transferencias']['Valor']
                            newSaldoD = destino.Conta.Saldo + req.body['Transferencias']['Valor']    
                             destino.Conta.Transferencias.push(new Object({
                                Data: req.body['Transferencias']['Data'],
                                Hora: req.body['Transferencias']['Hora'],
                                Status: "Recebido",
                                NomeDestino: result.nome,
                                CpfDestino: result.cpf,
                                BancoDestino: "eziBank",
                                AgenciaDestino: result.Conta.Agencia,
                                Valor: req.body['Transferencias']['Valor'],
                                ContaDestini: result.Conta.Numero
                            }))

                            result.Conta.Transferencias.push(new Object({
                                Data: req.body['Transferencias']['Data'],
                                Hora: req.body['Transferencias']['Hora'],
                                Status: "Pagamento",
                                NomeDestino: req.body['Transferencias']['NomeDestino'],
                                CpfDestino: req.body['Transferencias']['CpfDestino'],
                                BancoDestino: "eziBank",
                                AgenciaDestino: req.body['Transferencias']['AgenciaDestino'],
                                Valor: - req.body['Transferencias']['Valor'],
                                ContaDestini: req.body['Transferencias']['ContaDestini'],
                            }))
                            
                            await Usuario.updateOne(
                                { cpf: result.cpf },
                                { $set: { 
                                    "Conta.Transferencias": result.Conta.Transferencias,
                                    "Conta.Saldo": newSaldo
                                } }
                            );
                            await Usuario.updateOne(
                                { cpf: destino.cpf },
                                { $set: { 
                                    "Conta.Transferencias": destino.Conta.Transferencias,
                                    "Conta.Saldo": newSaldoD
                                } }
                            ); 
                            
                        }
                    }
                })
                
            }else{
                result.Conta.Transferencias.push(req.body['Transferencias'])
                newSaldo = result.Conta.Saldo - req.body['Transferencias']['Valor']
                result.Conta.Transferencias.Status = "Pagamento"
                await Usuario.updateOne(
                    { cpf: result.cpf },
                    { $set: { 
                        "Conta.Transferencias": result.Conta.Transferencias,
                        "Conta.Saldo": newSaldo
                    } }
                );
            }             
            return res.status(200).send( result )
        })
    } catch (err) {
        return res.status(400).send({ error: `Falha na busca: ${err}` });
    }
})

module.exports = app => app.use('/usuario', router)