const express = require("express");
const faker = require("faker");
const {fetchSmtp, fetchSmtpValues, editSmtp} = require("../../controller/smtp");

const smtpRouter = express.Router();

const auth = require("../../middleware/auth");
const Smtp = require("../../models/Smtp");

const webmail = ["Yes", "No"];
const seller = ["seller20", "seller21"];
const country = [
  "United States",
  "Germany",
  "India",
  "Russia",
  "China"
];

const generateSmtp = (num) => {
  const smtp = [];
  for (let i = 0; i < num; i++) {
    const newSmtp = {
      smtpid: faker.datatype.number(
        {min: 843000, max: 844000}
      ),
      country: faker.random.arrayElement(country),
      domain: faker.internet.domainSuffix(),
      webmail: faker.random.arrayElement(webmail),
      detect_hosting: faker.random.arrayElement(
        ["Amazon", "Amazon1", "Amazon2",]
      ),
      seller: faker.random.arrayElement(seller),
      price: faker.datatype.number(
        {min: 5, max: 50}
      ),
      date: faker.date.past(),
      // add other fields as needed
    };
    smtp.push(newSmtp);
  }
  return smtp;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

smtpRouter.post('/add', (req, res) => {
  Smtp.insertMany(generateSmtp(100)).then((smtps) => res.json(smtps)).catch((err) => console.error(err))
});
smtpRouter.get('/', fetchSmtpValues);
smtpRouter.post('/edit/:id', editSmtp);
smtpRouter.post('/', fetchSmtp);

module.exports = smtpRouter;
