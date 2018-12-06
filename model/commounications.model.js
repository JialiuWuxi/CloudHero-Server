const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommounicationSchema = new Schema({
    id: Number,
    MPNid: Number,
    date: Date,
    contact: String,
    detail: String,
    ptc: String,
})

const Commounication = mongoose.model('Commounication', CommounicationSchema);

module.exports = Commounication;
