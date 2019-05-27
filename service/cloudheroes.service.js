const CloudHero = require('../model/cloudhero.model');

require('../mongodb/mongodb').connect();

const heroFieldNames = ["MPNid", "ptc", "region", "benefitLevel", "name", "pdm", "ptcName", "pdmName", "BfC", "CED", "program"];

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

    if (!dataVerify(req, res)) return;

    const newHero = {};
    heroFieldNames.forEach(fieldName => newHero[fieldName] = req.body[fieldName]);

    cloudHeroes = new CloudHero(newHero);

    cloudHeroes.save(error => {
        if (checkServerError(res, error)) return;
        res.status(201).send(cloudHeroes);
        console.log('cloud hero created successfully!')
    })
}

function putHero(req, res) {
    if (!notEmpty(req, res)) return;
    const id = parseInt(req.params.id, 10);
    const updatedProps = req.body;

    CloudHero.findOne({ MPNid: id }, (error, hero) => {
        if (checkServerError(res, error)) return;
        if (!checkFound(res, hero)) return;

        heroFieldNames.forEach(fieldName => {
            if (updatedProps[fieldName] || updatedProps[fieldName] === false) {
                hero[fieldName] = updatedProps[fieldName];
            }
        });

        hero.save(error => {
            if (checkServerError(res, error)) return;
            res.status(200).json(hero);
            console.log('hero updated successfully!')
        });
    });
}

function deleteHero(req, res) {
    const id = parseInt(req.params.id, 10);
    CloudHero.findOneAndDelete({ MPNid: id })
        .then(hero => {
            if (!checkFound(res, hero)) return;
            res.status(200).json(hero);
            console.log('hero deleted successfully.');
        })
        .catch(error => {
            if (checkServerError(res, error)) return;
        });
}

async function deleteManyHeros(req, res) {
    const ids = req.body.ids;
    let deletedNumber = 0;
    if (ids && ids.length) {
        try {
            const v = await CloudHero.deleteMany({ MPNid: { $in: ids } });
            deletedNumber = v.ok === 1 ? v.n : -1;
        } catch (error) {
            checkServerError(res, error);
        }
    }

    if (deletedNumber === -1) {
        res.status(500).send("Something wrong");
    } else {
        res.status(200).json({
            msg: deletedNumber + ' partner(s) have been deleted.'
        });
    }
}

function getHeroesByPTC(req, res) {
    const docquery = CloudHero.find({ ptc: req.params.alias });
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

function getHeroesByPDM(req, res) {
    const docquery = CloudHero.find({ pdm: req.params.alias });
    docquery
        .exec()
        .then(cloudheroes => {
            res.status(200).send(cloudheroes);
        }).catch(error => {
            res.status(500).send(error);
            return;
        })
}

function dataVerify(req, res) {
    if (!heroFieldNames.reduce((res, fieldName) => !!(res && checkField(req.body[fieldName])), true)) {
        res.status(400).send('missing some data' + JSON.stringify(req.body));
        return false;
    }
    return true;
}

function notEmpty(req, res) {
    if (!heroFieldNames.reduce((res, fieldName) => !!(res || checkField(req.body[fieldName])), false)) {
        res.status(400).send('body is not verified' + JSON.stringify(req.body));
        return false;
    }
    return true;
}

function checkServerError(res, error) {
    if (error) {
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

function checkField(v) {
    return v || v === false;
}

module.exports = {
    getHeroes,
    postHero,
    putHero,
    deleteHero,
    deleteManyHeros,
    getHeroesByPTC,
    getHeroesByPDM,
}