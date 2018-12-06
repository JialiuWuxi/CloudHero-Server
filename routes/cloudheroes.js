const express = require('express');
const router = express.Router();
const cloudHeroService = require('../service/cloudheroes.service');

router.get('/', (req, res) => {
    cloudHeroService.getHeroes(req, res);
})


module.exports = router;
