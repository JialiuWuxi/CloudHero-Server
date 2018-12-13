const PTC = require('../model/ptcs.model');

require('../mongodb/mongodb').connect();

function getPTCList (req, res) {
    const docquery = PTC.find({});
    docquery
        .exec()
        .then(PTC => {
            res.status(200).json(JSON.stringify(PTC));
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        }); 
}


function postPTC (req, res) {

    const newPTC = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
    };

    ptc = new PTC( newPTC );

    ptc.save(error =>{
        if(checkServerError(res, error)) return;
        res.status(201).send(ptc);
        console.log('ptc created successfully!')
    })
}

function checkServerError(res, error) {
    if(error){
        res.status(500).send(error);
        return error;
    }
}

module.exports = {
    getPTCList,
    postPTC,
}