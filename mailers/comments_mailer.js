const nodeMailer = require('../config/nodemailer');

//testing how this mailer works, sending mail to the person who commented himself for now
exports.newComment = (comment) => {
    console.log('Inside new comment mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'anandkumarjha8719@gmail.com',
        to: comment.user.email,
        subject: "New Comment published",
        html: '<h1>Your comment on socialclub is published</h1>'
    }, (err, info) => {
        if(err){
            console.log('error in sending mail', err);
            return;
        }

        console.log('Mail Delivered', info);
        return;
    });
}