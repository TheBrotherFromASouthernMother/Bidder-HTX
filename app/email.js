const nodemailer = require('nodemailer');

const email = 'bidder.houston@gmail.com';

const pass = 'DigitalCrafts713#';

const fs = require('fs');

let welcomeMessage = fs.readFileSync('./views/registrationTemplate.html')

module.exports.sendMail = (msg, targetAddress) => {

  let transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
              user: email, // generated ethereal user
              pass: pass // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
          }
      });

  let mailOptions = {
    from: 'christian.lowe17@yahoo.com', // sender address
    to: 'christglowe@gmail.com', // list of receivers
    subject: 'Welcome to Biddr' // Subject line
    text: msg, // plain text body
    html: msg // html body
    };
}
