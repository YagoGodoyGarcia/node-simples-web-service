const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send("Comunicador Kaizala Servidor");
});

module.exports = router;