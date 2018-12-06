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

function postHeroes(req, res) {

    if(!dataVerify(req, res)) return;

    const newHero = {
        name: req.body.name,
        MPNid: req.body.MPNid,
        benefitLevel: req.body.benefitLevel,
        region: req.body.region,
        ptc: req.body.ptc,
    };

    cloudHeroes = new CloudHero(newHero);

    cloudHeroes.save(error =>{
        if(checkServerError(res, error)) return;
        res.status(201).send(cloudHeroes);
        console.log('cloud hero created successfully!')
    })
}

function putHeroes(req, res) {
    if(!dataVerify(req,res)) return;
    const id = parseInt(req.params.id, 10);
    const updatedHero = { MPNid: req.body.MPNid, name: req.body.name, region: req.body.region, benefitLevel: req.body.benefitLevel };
    CloudHero.findOne({MPNid: id}, (error, hero) => {
        if(checkServerError(res, error)) return;
        if(!chechFound( res, hero)) return;
        hero.MPNid = updatedHero.MPNid;
        hero.name = updatedHero.name;
        hero.region = updatedHero.region;
        hero.benefitLevel = updatedHero.benefitLevel;
        hero.save(error => {
            if(checkServerError(res, error)) return;
            res.status(200).json(hero);
            console.log('hero updated successfully!')
        });
    });
}

function dataVerify(req, res) {
    if(!req.body.MPNid || !req.body.ptc || !req.body.region || !req.body.benefitLevel){
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

function chechFound(res, hero) {
    if (!hero) {
        res.status(404).send('Hero not found.');
        return;
    }
    return hero;
}

module.exports = {
    getHeroes,
    postHeroes,
    dataVerify,
    putHeroes,
}