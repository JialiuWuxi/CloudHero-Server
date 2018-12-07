const CloudHero = require('../model/cloudhero.model');

require('../mongodb/mongodb').connect();

function getHeroes(req, res) {
    const docquery = CloudHero.find({});
    docquery
        .exec()
        .then(cloudHeroes => {
            res.status(200).json(cloudHeroes);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        }); 
}

function postHero(req, res) {

    if(!dataVerify(req, res)) return;

    const newHero = {
        name: req.body.name,
        MPNid: req.body.MPNid,
        benefitLevel: req.body.benefitLevel,
        region: req.body.region,
        ptc: req.body.ptc,
        pdm: req.body.pdm,
    };

    cloudHeroes = new CloudHero(newHero);

    cloudHeroes.save(error =>{
        if(checkServerError(res, error)) return;
        res.status(201).send(cloudHeroes);
        console.log('cloud hero created successfully!')
    })
}

function putHero(req, res) {
    if(!dataVerify(req,res)) return;
    const id = parseInt(req.params.id, 10);
    const updatedHero = { MPNid: req.body.MPNid,
                          name: req.body.name,
                          region: req.body.region, 
                          benefitLevel: req.body.benefitLevel,
                          pdm: req.body.pdm };

    CloudHero.findOne({MPNid: id}, (error, hero) => {
        if(checkServerError(res, error)) return;
        if(!checkFound( res, hero)) return;
        hero.MPNid = updatedHero.MPNid;
        hero.name = updatedHero.name;
        hero.region = updatedHero.region;
        hero.benefitLevel = updatedHero.benefitLevel;
        hero.pdm = updatedHero.pdm;
        hero.save(error => {
            if(checkServerError(res, error)) return;
            res.status(200).json(hero);
            console.log('hero updated successfully!')
        });
    });
}

function deleteHero (req, res) {
    const id = parseInt(req.params.id, 10);
    CloudHero.findOneAndDelete({MPNid: id})
        .then(hero => {
            if(!checkFound(res, hero)) return;
            res.status(200).json(hero);
            console.log('hero deleted successfully.');
        })
        .catch(error => {
            if(checkServerError(res, error)) return;
        });
}

function getHeroesByPTC (req , res) {
    const docquery = CloudHero.find({ptc: req.params.alias});
    docquery
        .exec()
        .then(cloudHeroes => {
            res.status(200).send(cloudHeroes);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        })
}

function getHeroesByPDM (req, res) {
    const docquery = CloudHero.find({pdm: req.params.alias});
    docquery
        .exec()
        .then( cloudheroes => {
            res.status(200).send(cloudheroes);
        }).catch(error => {
            res.status(500).send(error);
            return;
        })
}

function dataVerify (req, res) {
    if(!req.body.MPNid || !req.body.ptc || !req.body.region || !req.body.benefitLevel || !req.body.name || !req.body.pdm){
        res.status(400).send('missing some data' + JSON.stringify(req.body));
        return false;
    }
    return true;
}

function checkServerError(res, error) {
    if(error){
        res.status(500).send(error);
        return error;
    }
}

function checkFound(res, hero) {
    if (!hero) {
        res.status(404).send('Hero not found.');
        return;
    }
    return hero;
}

module.exports = {
    getHeroes,
    postHero,
    putHero,
    deleteHero,
    getHeroesByPTC,
    getHeroesByPDM,
}