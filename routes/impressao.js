const express = require('express');
const router = express.Router();
const request = require('request-promise');


router.post('/', async (req, res) => {

    const impressao = new Object({
        objectId: req.body.objectId,
        objectType: req.body.objectType,
        eventType: req.body.eventType,
        data: req.body.data,
        fromUser: req.body.fromUser,
        fromUserName: req.body.fromUserName,
        fromUserProfilePic: req.body.fromUserProfilePic,
    });

    // let options = {
    //     method: 'POST',
    //     uri: 'http://189.44.46.251:3000/api/impressao',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: {
    //         Impressao: impressao
    //     },
    //     json: true
    // }
    // request(options)
    //     .then((body) => {
    //         console.log('post')
    //         console.log(body)
    //         res.send(body)
    //     }).catch((err) => {
    //         console.log('post')
    //         console.log(err)
    //         res.status(404).send(err.message);
    //     })

    console.log(impressao)
    console.log("---------------------------------------------------------\n")
    console.log(impressao['data']['responseDetails']['responseWithQuestions'])
});

router.get('/', async (req, res) => {
    res.send(req.query.validationToken);
});

module.exports = router;


