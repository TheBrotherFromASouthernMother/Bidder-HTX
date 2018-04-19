const nodemailer = require('nodemailer');

const email = 'bidder.houston@gmail.com';

const pass = 'DigitalCrafts713#';

const fs = require('fs');

// let welcomeMessage = fs.readFileSync('./views/registrationTemplate.html').toString();

module.exports.sendMail = (targetAddress) => {

  let transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: email,
              pass: pass
          },
          tls: {
            rejectUnauthorized: false
          }
      });

  let mailOptions = {
    from: 'bidder.houston@gmail.com', // sender address
    to: targetAddress, // list of receivers
    subject: 'Welcome to Biddr', // Subject line
    text: "", // plain text body
    html: welcomeMessage // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    });
}
