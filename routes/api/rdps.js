const express = require("express");
const faker = require("faker");
const { fetchRdps, fetchRdpsValues } = require("../../controller/rdps");

const rdpsRouter = express.Router();

const auth = require("../../middleware/auth");
const Rdps = require("../../models/Rdps");

const windows = ["2022", "2022 ✅✅💯💯", "2022💯✅", "2022 ✅💯"];
const access = ["Admin", "user", "admin"];
const ram = ["64gb", "12gb", "32gb"];
const seller = ["seller20", "seller21"];
const country = ["United States", "Germany", "India", "Russia", "China"];

const generateRdps = (num) => {
  const rdps = [];
  for (let i = 0; i < num; i++) {
    const newRdps = {
      country: faker.random.arrayElement(country),
      ip: faker.internet.ip(),
      windows: faker.random.arrayElement(windows),
      ram: faker.random.arrayElement(ram),
      access: faker.random.arrayElement(access),
      user: faker.name.findName(),
      detect_hosting: faker.random.arrayElement([
        "Amazon",
        "Amazon1",
        "Amazon2",
      ]),
      seller: faker.random.arrayElement(seller),
      price: faker.datatype.number({ min: 5, max: 50 }),
      date: faker.date.past(),
      // add other fields as needed
    };
    rdps.push(newRdps);
  }
  return rdps;
};

// Rdps.insertMany(generateRdps(20))
//   .then(() => console.log(`20 rdps inserted into database`))
//   .catch((err) => console.error(err));

rdpsRouter.get('/', fetchRdpsValues);
rdpsRouter.post('/', fetchRdps);

module.exports = rdpsRouter;
