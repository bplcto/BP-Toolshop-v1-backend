const express = require("express");
const faker = require("faker");
const {fetchProgramScript, fetchProgramScriptValues, editProgramScript} = require("../../controller/programScript");

const programScriptRouter = express.Router();

const auth = require("../../middleware/auth");
const ProgramScript = require("../../models/ProgramScript");

const ssl = ["http", "https"];
const seller = ["seller20", "seller21"];
const country = ["IN", "US", "DE", "CA", "CN", "RS"];

const generateProgramScript = (num) => {
  const programScript = [];
  for (let i = 0; i < num; i++) {
    const newProgramScript = {
      country: faker.random.arrayElement(country),
      description: faker.random.arrayElement(
        ["TD 🏦 PAGE & LETTER 2023 💯✅🔥", "WELLS FARG 🏦 PAGE 2023 💯✅🔥", "CHASE 🏦 PAGE 2023 💯✅🔥",]
      ),
      seller: faker.random.arrayElement(seller),
      price: faker.datatype.number(
        {min: 5, max: 50}
      ),
      date: faker.date.past(),
      // add other fields as needed
    };
    programScript.push(newProgramScript);
  }
  return programScript;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

programScriptRouter.get('/add', (req, res) => {
  ProgramScript.insertMany(generateProgramScript(100)).then((programScripts) => res.json(programScripts)).catch((err) => console.error(err))
});
programScriptRouter.get('/', fetchProgramScriptValues);
programScriptRouter.post('/edit/:id', editProgramScript);
programScriptRouter.post('/', fetchProgramScript);

module.exports = programScriptRouter;
