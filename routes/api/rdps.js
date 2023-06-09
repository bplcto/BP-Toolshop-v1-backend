const express = require("express");
const faker = require("faker");
const { fetchRdps, fetchRdpsValues, editRdp } = require("../../controller/rdps");

const rdpsRouter = express.Router();

const auth = require("../../middleware/auth");
const Rdps = require("../../models/Rdps");

const windows = ["2022", "2022 ✅✅💯💯", "2022💯✅", "2022 ✅💯"];
const access = ["Admin", "user", "admin"];
const ram = ["64gb", "12gb", "32gb"];
const seller = ["seller20", "seller21"];
const country = ["IN", "US", "DE", "CA", "CN", "RS"];

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


rdpsRouter.get('/add',(req,res) => {
  Rdps.insertMany(generateRdps(100))
  .then((rdps) => res.json(rdps))
  .catch((err) => console.error(err));
})
rdpsRouter.get('/', fetchRdpsValues);
rdpsRouter.post('/edit/:id', editRdp);
rdpsRouter.post('/', fetchRdps);

module.exports = rdpsRouter;
