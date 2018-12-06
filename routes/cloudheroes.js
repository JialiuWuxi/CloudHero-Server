const express = require('express');
const router = express.Router();
const cloudHeroService = require('../service/cloudheroes.service');

router.get('/', (req, res) => {
    cloudHeroService.getHeroes(req, res);
})

router.post('/', (req, res) => {
    cloudHeroService.postHero(req, res);
})

router.put('/:id', (req, res) => {
    cloudHeroService.putHero(req, res);
})

router.delete('/:id', (req, res) => {
    cloudHeroService.deleteHero(req, res);
})



module.exports = router;
