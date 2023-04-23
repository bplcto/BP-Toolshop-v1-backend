const express = require("express");
const faker = require("faker");
const {fetchLead, fetchLeadValues, editLead} = require("../../controller/lead");

const leadRouter = express.Router();

const auth = require("../../middleware/auth");
const Lead = require("../../models/lead");

const seller = ["seller20", "seller21"];
const country = [
  "United States",
  "Germany",
  "India",
  "Russia",
  "China"
];

const generateLead = (num) => {
  const lead = [];
  for (let i = 0; i < num; i++) {
    const newLead = {
      country: faker.random.arrayElement(country),
      description: faker.lorem.sentence(),
      emailn: faker.random.arrayElement(
        ["100k", "10k", "5k",]
      ),
      seller: faker.random.arrayElement(seller),
      price: faker.datatype.number(
        {min: 5, max: 50}
      ),
      date: faker.date.past(),
      // add other fields as needed
    };
    lead.push(newLead);
  }
  return lead;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

leadRouter.post('/add', (req, res) => {
  Lead.insertMany(generateLead(100)).then((leads) => res.json(leads)).catch((err) => console.error(err))
});
leadRouter.get('/', fetchLeadValues);
leadRouter.post('/edit/:id', editLead);
leadRouter.post('/', fetchLead);

module.exports = leadRouter;
