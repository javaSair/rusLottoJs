// var mongoose = require('../models/getMongoose');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/shopAccounts', {useNewUrlParser: true, useUnifiedTopology: true});// подключение первой базы
// mongoose.createConnection('mongodb://localhost/connect_session'); // подключение последующих баз


mongoose.set('useCreateIndex', true);


/**
 * callback function
 */
var shutDownDB = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('The message ' + msg);
        callback();
    })
};

// для генерации событий в windows
var readLine = require("readline");
if (process.platform === "win32") {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}


//event listener mongoDB-----------------------------------------
// once == однократное прослушвание. on == многократное прослушивание
// event-reset-nodemon
process.once('SIGUSR2', function () {
    shutDownDB('reset-nodemon', function () {
        process.kill(process.pid, 'SIGUSR2');
    })
});

// event-exist
process.once('SIGINT', function () {
    shutDownDB('exit...', function () {
        process.exit(0);
    });
});


// event-connect-mongoDB
mongoose.connection.on('connected', function () {
    console.log('mongoDB connect ok');
    // mongoose.connection.db.dropCollection('users', function(err, result) {
    //     console.log(err);
    // });
    // console.log('NODE -> '+process.env.NODE_ENV);
});

// event-error-mongoDB
mongoose.connection.on('error', function (err) {
    console.log('mongoDB error ' + err);
});

// event-disconnect-mongoDB
mongoose.connection.on('disconnected', function () {
    console.log('mongoDB disconnect ok');
});

// ------------------------------------------------------------------------


require('./schemes');


