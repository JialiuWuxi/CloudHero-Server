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

module.exports = {
    getHeroes,
}