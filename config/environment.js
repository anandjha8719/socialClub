require('dotenv').config();

const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// const accessLogStream = rfs('access.log', {
//     interval: '1d',
//     path: logDirectory
// });
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: process.env.SC_ASSET_PATH,
    session_cookie_key: 'blahsomething',
    db: 'mongodb://localhost/dev_socialclub',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SC_MAILER_USERID,
            pass: process.env.SC_MAILER_PASS
        }
    },
    google_client_id: "812677332807-pk1s7fhjvr4tlok9tbtu309lvgj184pn.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'socialclub',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }


}

const production = {
    name: 'production',
    asset_path: process.env.SC_ASSET_PATH,
    session_cookie_key: process.env.SC_SESSION_COOKIE_KEY,
    db: process.env.SC_DB_PRODUCTION,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SC_MAILER_USERID,
            pass: process.env.SC_MAILER_PASS
        }
    },
    google_client_id: process.env.SC_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SC_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SC_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SC_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }

}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);