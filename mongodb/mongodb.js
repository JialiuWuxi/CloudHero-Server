const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const mongoUrl = `mongodb://${process.env.dbName}.documents.azure.com:${process.env.cosmosPort}/${process.env.dbName}?ssl=true`;

function connect(){
    return mongoose.connect(mongoUrl, {
        auth: {
            user: `${process.env.dbName}`,
            password: `${process.env.key}`
        },
        useNewUrlParser: true,
        useCreateIndex: true,
    });
}
module.exports = {
    connect
};