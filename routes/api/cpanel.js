const express = require("express");
const faker = require("faker");
const {fetchCpanel, fetchCpanelValues, editCpanel} = require("../../controller/cpanel");

const cpanelRouter = express.Router();

const auth = require("../../middleware/auth");
const Cpanel = require("../../models/Cpanel");

const ssl = ["http", "https"];
const seller = ["seller20", "seller21"];
const country = [
  "United States",
  "Germany",
  "India",
  "Russia",
  "China"
];

const generateCpanel = (num) => {
  const cpanel = [];
  for (let i = 0; i < num; i++) {
    const newCpanel = {
      country: faker.random.arrayElement(country),
      tld: faker.internet.domainSuffix(),
      ssl: faker.random.arrayElement(ssl),
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
    cpanel.push(newCpanel);
  }
  return cpanel;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

cpanelRouter.post('/add', (req, res) => {
  Cpanel.insertMany(generateCpanel(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err))
});
cpanelRouter.get('/', fetchCpanelValues);
cpanelRouter.post('/edit/:id', editCpanel);
cpanelRouter.post('/', fetchCpanel);

module.exports = cpanelRouter;
