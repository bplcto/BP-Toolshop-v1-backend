const express = require("express");
const faker = require("faker");
const {fetchVps, fetchVpsValues, editVps} = require("../../controller/vps");

const vpsRouter = express.Router();

const auth = require("../../middleware/auth");
const Vps = require("../../models/Vps");

const windows = ["2022", "2022 ✅✅💯💯", "2022💯✅", "2022 ✅💯"];
const access = ["Admin", "user", "admin"];
const ram = ["64gb", "12gb", "32gb"];
const seller = ["seller20", "seller21"];
const country = [
  "United States",
  "Germany",
  "India",
  "Russia",
  "China"
];

const generateVps = (num) => {
  const vps = [];
  for (let i = 0; i < num; i++) {
    const newVps = {
      country: faker.random.arrayElement(country),
      information: faker.lorem.sentence(),
      login: faker.random.word(),
      ram: faker.random.arrayElement(ram),
      access: faker.random.arrayElement(access),
      user: faker.name.findName(),
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
    vps.push(newVps);
  }
  return vps;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

vpsRouter.post('/add', (req, res) => {
  Vps.insertMany(generateVps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err))
});
vpsRouter.get('/', fetchVpsValues);
vpsRouter.post('/edit/:id', editVps);
vpsRouter.post('/', fetchVps);

module.exports = vpsRouter;
