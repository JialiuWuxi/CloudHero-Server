const Commounications = require('../model/commounications.model');

require('../mongodb/mongodb').connect();

function getCommounications (req, res) {
    const docquery = Commounications.find({});
    docquery
        .exec()
        .then(commounications => {
            res.status(200).json(commounications);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        }); 
}

function getCommounicationsByPartner (req, res) {
    const docquery = Commounications.find({MPNid: req.params.id});
    docquery
        .exec()
        .then(commounications => {
            res.status(200).json(commounications);
        })
        .catch(error => {
            res.status(500).send(error);
            return;
        }); 
}

function postCommounication (req, res) {
    if(!dataVerify(req, res)) return;

    const newCommounication = {
        id: req.body.id,
        MPNid: req.body.MPNid,
        date: req.body.date,
        contact: req.body.contact,
        ptc: req.body.ptc,
        detail: req.body.detail
    };

    commounication = new Commounications( newCommounication );

    commounication.save(error =>{
        if(checkServerError(res, error)) return;
        res.status(201).send(commounication);
        console.log('commounication created successfully!')
    })
}

function dataVerify (req, res) {
    if(!req.body.MPNid || !req.body.ptc || !req.body.date || !req.body.id || !req.body.contact || !req.body.detail){
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

module.exports = {
    getCommounications,
    getCommounicationsByPartner,
    postCommounication,
}