var mongoose = require('mongoose');
require('dotenv').config();
let URI = process.env.MONGO_URI;
class Database {
    constructor () {
            mongoose.connect(URI,
            { useNewUrlParser: true, useUnifiedTopology: true}
            )
            .then(result => {console.log(`Se conectó a MongoDB`);
            // mongoose.connection.db.listCollections().toArray(function (err, names) {
            //     console.log(names); // [{ name: 'dbname.myCollection' }]
            //     module.exports.Collection = names;
            // });
            }
            )
            .catch(error => console.log(error));
        }
}

module.exports = new Database();