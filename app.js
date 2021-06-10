const express = require('express');
const app = express();
const cors = require('cors');
var nodemailer = require('nodemailer');
require('dotenv').config();
const ejs = require('ejs');
const htmlPdf = require('html-pdf');

//Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

async function htmlToPdfBuffer(pathname, params) {
  const html = await ejs.renderFile(pathname, params);
  return new Promise((resolve, reject) => {
    htmlPdf.create(html).toBuffer((err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

app.post('/invoice', async (req, res) => {
  const fileBuffer = await htmlToPdfBuffer('template.ejs', {
    id: req.body.id,
    name: req.body.name,
    amount: req.body.amount,
    date: req.body.date,
  });

  var mailOptions = {
    from: 'hashmi.adnan791@gmail.com',
    to: req.body.email,
    subject: 'Invoice for donation',
    text: 'Thank You for your donation. Find below the attachment for your invoice.',
    attachments: {
      filename: 'invoice.pdf',
      content: fileBuffer,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log('=============> email sent <=============');
  res.end();
});

app.get('/view', (req, res) => {
  const id = '123123';
  const name = 'Adan';
  const amount = '1220';
  const date = '2020';
  res.render('template', { id, name, amount, date });
});

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
}
app.listen(process.env.PORT || 8282, () => {
  console.log('listening on port 8282');
});
