const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

if (process.env.NODE_ENV !== 'production') require('../../apiKey')

async function main(email, userName, emailTemplate) {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.NODE_MAILER_KEY
      }
    })
  )

  await transporter.sendMail({
    to: email,
    from: 'eventshare2020@gmail.com', // sender address
    subject: `${userName} has invited you to an event!`,
    html: `${emailTemplate}` // html body
  })

  console.log('Message sent')
}

module.exports = main
