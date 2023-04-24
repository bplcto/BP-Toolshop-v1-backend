const express = require("express");
const faker = require("faker");
const {fetchPhpMailer, fetchPhpMailerValues, editPhpMailer} = require("../../controller/phpmailer");

const phpmailerRouter = express.Router();

const auth = require("../../middleware/auth");
const PhpMailer = require("../../models/PhpMailer");

const seller = ["seller20", "seller21"];
const country = ["IN", "US", "DE", "CA", "CN", "RS"];

const generatePhpMailer = (num) => {
  const phpmailer = [];
  for (let i = 0; i < num; i++) {
    const newPhpMailer = {
      id: faker.datatype.number(
        {min: 843000, max: 844000}
      ),
      country: faker.random.arrayElement(country),
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
    phpmailer.push(newPhpMailer);
  }
  return phpmailer;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

phpmailerRouter.get('/add', (req, res) => {
  PhpMailer.insertMany(generatePhpMailer(100)).then((phpmailers) => res.json(phpmailers)).catch((err) => console.error(err))
});
phpmailerRouter.get('/', fetchPhpMailerValues);
phpmailerRouter.post('/edit/:id', editPhpMailer);
phpmailerRouter.post('/', fetchPhpMailer);

module.exports = phpmailerRouter;
