const express = require("express");
const faker = require("faker");
const {fetchShell, fetchShellValues, editShell} = require("../../controller/shell");

const shellRouter = express.Router();

const auth = require("../../middleware/auth");
const Shell = require("../../models/Shell");

const ssl = ["http", "https"];
const seller = ["seller20", "seller21"];
const country = [
  "United States",
  "Germany",
  "India",
  "Russia",
  "China"
];

const generateShell = (num) => {
  const shell = [];
  for (let i = 0; i < num; i++) {
    const newShell = {
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
    shell.push(newShell);
  }
  return shell;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

shellRouter.post('/add', (req, res) => {
  Shell.insertMany(generateShell(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err))
});
shellRouter.get('/', fetchShellValues);
shellRouter.post('/edit/:id', editShell);
shellRouter.post('/', fetchShell);

module.exports = shellRouter;
