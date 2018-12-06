const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// const mongoUrl = `mongodb://${process.env.dbName}.documents.azure.com:${process.env.cosmosPort}/${process.env.dbName}?ssl=true`;
const mongoUrl = 'mongodb://cloudhero.documents.azure.com:10255/cloudhero?ssl=true';

function connect(){
    return mongoose.connect(mongoUrl, {
        auth: {
            // user: `${process.env.dbName}`,
            // password: `${process.env.key}`
            user: 'cloudhero',
            password: 'QojcqqTqgXnbZXM7JsQ215wSB8iAF8CBgNsCH85vGgRoKTh5jzVJaaJi5tstKL3At4YSrgBq9L43TedYYhsBjw=='
        },
        useNewUrlParser: true,
        useCreateIndex: false,
    });
}
module.exports = {
    connect
};