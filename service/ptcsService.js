const PTC = require('../model/ptcs.model');

require('../mongodb/mongodb').connect();

function getPTCList (req, res) {
    const docquery = PTC.find({});
    docquery
        .exec()
        .then(PTC => {
            res.status(200).json(PTC);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        }); 
}

module.exports = {
    getPTCList,
}