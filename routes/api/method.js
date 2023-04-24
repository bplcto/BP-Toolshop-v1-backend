const express = require("express");
const faker = require("faker");
const {fetchMethod, fetchMethodValues, editMethod} = require("../../controller/method");

const methodRouter = express.Router();

const auth = require("../../middleware/auth");
const Method = require("../../models/Method");

const ssl = ["http", "https"];
const seller = ["seller20", "seller21"];
const country = ["IN", "US", "DE", "CA", "CN", "RS"];

const generateMethod = (num) => {
  const method = [];
  for (let i = 0; i < num; i++) {
    const newMethod = {
      country: faker.random.arrayElement(country),
      description: "Bin- " + faker.datatype.number(
        {min: 400000, max: 500000}
      ),
      seller: faker.random.arrayElement(seller),
      price: faker.datatype.number(
        {min: 5, max: 50}
      ),
      date: faker.date.past(),
      // add other fields as needed
    };
    method.push(newMethod);
  }
  return method;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

methodRouter.get('/add', (req, res) => {
  Method.insertMany(generateMethod(100)).then((methods) => res.json(methods)).catch((err) => console.error(err))
});
methodRouter.get('/', fetchMethodValues);
methodRouter.post('/edit/:id', editMethod);
methodRouter.post('/', fetchMethod);

module.exports = methodRouter;
