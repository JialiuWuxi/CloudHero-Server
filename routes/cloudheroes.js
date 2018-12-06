const express = require('express');
const router = express.Router();
const cloudHeroService = require('../service/cloudheroes.service');

router.get('/', (req, res) => {
    cloudHeroService.getHeroes(req, res);
})

router.post('/', (req, res, next) =>{
    cloudHeroService.dataVerify(req, res);
    next();
},(req, res) => {
    cloudHeroService.postHeroes(req, res);
})


module.exports = router;
