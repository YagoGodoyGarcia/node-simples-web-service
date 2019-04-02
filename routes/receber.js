
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
   return req.body
});

module.exports = router;