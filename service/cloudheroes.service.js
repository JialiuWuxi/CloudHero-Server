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

    if (!dataVerify(req, res)) return;

    const newHero = {
        name: req.body.name,
        MPNid: req.body.MPNid,
        benefitLevel: req.body.benefitLevel,
        region: req.body.region,
        ptc: req.body.ptc,
        pdm: req.body.pdm,
        ptcName: req.body.ptcName,
        pdmName: req.body.pdmName,
        BfC: req.body.BfC,
        CED: req.body.CED,
        program: req.body.program,
    };

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
        updatedProps.MPNid && (hero.MPNid = updatedProps.MPNid);
        updatedProps.name && (hero.name = updatedProps.name);
        updatedProps.region && (hero.region = updatedProps.region);
        updatedProps.benefitLevel && (hero.benefitLevel = updatedProps.benefitLevel);
        updatedProps.ptc && (hero.ptc = updatedProps.ptc);
        updatedProps.ptcName && (hero.ptcName = updatedProps.ptcName);
        updatedProps.pdm && (hero.pdm = updatedProps.pdm);
        updatedProps.pdmName && (hero.pdmName = updatedProps.pdmName);
        (updatedProps.CED || updatedProps.CED === false) && (hero.CED = updatedProps.CED);
        (updatedProps.BfC || updatedProps.BfC === false) && (hero.BfC = updatedProps.BfC);
        updatedProps.program && (hero.program = updatedProps.program);
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
    if (!req.body.MPNid || !req.body.ptc || !req.body.region || !req.body.benefitLevel || !req.body.name || !req.body.pdm) {
        res.status(400).send('missing some data' + JSON.stringify(req.body));
        return false;
    }
    return true;
}

function notEmpty(req, res) {
    if (!req.body.MPNid && !req.body.ptc && !req.body.region && !req.body.benefitLevel && !req.body.name && !req.body.pdm) {
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

module.exports = {
    getHeroes,
    postHero,
    putHero,
    deleteHero,
    deleteManyHeros,
    getHeroesByPTC,
    getHeroesByPDM,
}