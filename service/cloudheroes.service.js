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

function dataVerify(req, res) {
    if(!req.body.MPNid || !req.body.ptc || !req.body.region || !req.body.benefitLevel){
        res.status(400).send('missing some data' + JSON.stringify(req.body));
    }
}

function checkServerError(res, error) {
    if(error){
        res.status(500).send(error);
        return error;
    }
}

module.exports = {
    getHeroes,
    postHeroes,
    dataVerify,
}