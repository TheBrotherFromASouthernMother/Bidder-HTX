const nodemailer = require('nodemailer');

const email = 'bidder.houston@gmail.com';

const pass = 'DigitalCrafts713#';

const fs = require('fs');


module.exports.sendMail = (msg, targetAddress) => {
  fs.readFileSync('./')
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
}
