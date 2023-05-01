const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_email_password',
  },
});

const sendPasswordResetEmail = async (email, token) => {
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient_email@example.com',
    subject: 'Test Email',
    text: 'This is a test email sent using Nodemailer.',
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


// const nodemailer = require('nodemailer');
// const mailgun = require('mailgun-js')({
//   apiKey: 'df0a4ec14c6ab83e35eea5324a93ef6a-70c38fed-ed7ad58a',
//   domain: 'bpltoolshop1-jamesgaylor721.b4a.run'
// });
// // const mailgun = require('mailgun-js')({
// //   apiKey: "5082a622e448e21378aa119ed54ae9aa-181449aa-6fc11782",
// //   domain: "sandbox6bf43c088a914f85afe42c1c00bfd040.mailgun.org"
// // });

// // // const transporter = nodemailer.createTransport({
// // //   service: 'Gmail',
// // //   auth: {
// // //     user: "james.gaylor721@gmail.com",
// // //     pass: "psg20020415",
// // //   },
// // // });

// const sendPasswordResetEmail = async (email, token) => {
//   console.log(email, token);
//   // let transporter = nodemailer.createTransport({
//   //   service: 'gmail',
//   //   auth: {
//   //       user: 'james.gaylor721@gmail.com',
//   //       pass: 'Psg2002.415.com'
//   //   }
//   // });
  
//   let mailOptions = {
//     from: 'james.gaylor721@gmail.com',
//     to: 'foryoursuccess0415@gmail.com',
//     subject: 'Test Email',
//     text: 'This is a test email sent using node-mailer.'
//   };
  
//   // transporter.sendMail(mailOptions, function(error, info){
//   //   if (error) {
//   //       console.log(error);
//   //   } else {
//   //       console.log('Email sent: ' + info.response);
//   //   }
//   // });
//   // const resetUrl = `http://localhost:3000/reset-password/${token}`;
//   // const data = {
//   //   from: 'james.gaylor721@gmail.com',
//   //   to: 'luckycodemoneky@gmail.com',
//   //   subject: 'Test email',
//   //   text: 'This is a test email'
//   // };
  
//   mailgun.messages().send(mailOptions, (error, body) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log('Email sent', body);
//     }
//   });
// };

module.exports = { sendPasswordResetEmail };
