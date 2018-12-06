const express = require('express');
const router = express.Router();
const cloudHeroService = require('../service/cloudheroes.service');

router.get('/', (req, res) => {
    cloudHeroService.getHeroes(req, res);
})

router.post('/', (req, res) => {
    cloudHeroService.postHeroes(req, res);
})

router.put('/:id', (req, res) => {
    cloudHeroService.putHeroes(req, res);
})


module.exports = router;
