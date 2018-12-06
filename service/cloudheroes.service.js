

function getHeroes(req, res) {
    res.status(200).send(process.env.cosmosPort)
}

module.exports = {
    getHeroes,
}