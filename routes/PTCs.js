const express = require('express');
const router = express.Router();
const ptcsService = require('../service/ptcsService');


router.get('/', (req, res) => {
    ptcsService.getPTCList(req, res);
})

router.post('/', (req, res) => {
    ptcsService.postPTC(req, res);
})


module.exports = router;
