const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PTCSchema = new Schema({
    id: Number,
    name: String,
    email: String,
})

const PTC = mongoose.model('PTC', PTCSchema);

module.exports = PTC;
