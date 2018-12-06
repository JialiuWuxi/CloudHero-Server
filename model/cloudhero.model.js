const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CloudHeroSchma = new Schema({
    MPNid: Number,
    name: String,
    region: String,
    benefitLevel: String,
    ptc: String,
});

const CloudHero = mongoose.model('CloudHero', CloudHeroSchma);

module.exports = CloudHero;