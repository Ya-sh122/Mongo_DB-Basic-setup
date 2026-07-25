const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'SRV address link'
    )
        .then(client => {
            console.log('Connected to MongoDB');

            _db = client.db();

            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No Database Found!';
};

module.exports = {
    mongoConnect,
    getDb
};