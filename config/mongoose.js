const mongoose = require('mongoose');
const env = require('./environment');

if(env.name == 'development'){
    mongoose.connect(env.db);
} else {
    const url = env.db;
    const connectionParams={
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true 
    }

    mongoose.connect(url,connectionParams);
}



const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;