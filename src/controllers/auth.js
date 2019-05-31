const express = require('express')

const Usuario = require('../models/Usuario')

const router = express.Router();
/**
 * @author Yago Garcia
 */

router.post('/registrar', async (req, res) => {
    try {
        let usuario = await Usuario.findOne({ cpf: req.body['cpf'] })
        if (!usuario) {
            if(req.body['Status'] == "Pendente"){
                usuario = await new Usuario(req.body)
                usuario.save()
            }else{
                usuario = await new Usuario(req.body)
                usuario.save()
            }            
        } else {
            return res.status(403).send({ error: 'Pet ja está registrado' });
        }

        return res.status(201).send({ usuario })
    } catch (err) {
        return res.status(400).send({ err: 'Falha no registro' });
    }
})

router.post('/status', async (req, res) => {
    try {
        let status = true
        let usuario = await Pendente.findOne({ cpf: req.body['cpf'] })
        if (!usuario) {
            status = false
        }

        return res.status(200).send({status})
    } catch (err) {
        return res.status(400).send({ error: 'Falha na busca' });
    }
})

/*
//API de atualização de pet
router.put('/atualizar', async (req, res) => {
    try {
        //Buscando e atualizando pet
        let pet = await Pet.updateOne(
            { _id: req.body['id'] },
            { $set: {
                nome: req.body['nome'],
                porte: req.body['porte'],
                raca: req.body['raca'],
                dono: req.body['dono']
            } }
         )
        return res.status(204).send("Atualizado")
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na atualização' });
    }
})

//API de remover pet
router.delete('/remover', async (req, res) => {
    try {
        //Buscando e removendo pet
        let pet = await Pet.deleteOne({ _id: req.body['id'] })
        return res.status(204).send("Deletado")
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na remoção' });
    }
})

//API de buscar pet
router.get('/pesquisar/:nome/:dono', async (req, res) => {
    try {
        //Buscando o pet
        let pet = await Pet.findOne({
            $and: [
                {
                    nome: req.params.nome,
                    dono: req.params.dono
                }
            ]
        })
        if(!pet){
            return res.status(400).send({ error: `Pet informado não existe ou inválido: - Dono: ${req.body['dono']}  - Pet: ${req.body['nome']}` });
        }
        return res.status(200).send({ pet })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na busca' });
    }
})

//API de listar todos os pet
router.get('/', async (req, res) => {
    try {
        //Buscando todos os pet
        let pet = await Pet.find()
        return res.status(200).send({ pet })
    } catch (err) {
        //Retorna caso ocorra alguma falha no processo
        return res.status(400).send({ error: 'Falha na busca' });
    }
})
*/
module.exports = app => app.use('/usuario', router)