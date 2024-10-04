const { MailtrapClient } = require("mailtrap");
const dotenv=require('dotenv')
dotenv.config()
const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "ahmed",
};
module.exports={client,sender}
// const recipients = [
//   {
//     email: "alinshwan33@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);