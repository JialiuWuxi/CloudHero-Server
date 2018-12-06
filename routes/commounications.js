const express = require('express');
const router = express.Router();
const commounicationsService = require('../service/commounications.service');

router.get('/', (req, res) => {
    commounicationsService.getCommounications(req, res);
}) 

router.get('/partner/:id', (req, res) => {
    commounicationsService.getCommounicationsByPartner(req, res);
})

router.post('/', (req, res) => {
    commounicationsService.postCommounication(req, res);
})

module.exports = router;