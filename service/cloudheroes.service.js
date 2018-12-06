

function getHeroes(req, res) {
    res.status(200).send(process.env.key)
}

module.exports = {
    getHeroes,
}