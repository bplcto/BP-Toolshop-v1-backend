const express = require("express");
const faker = require("faker");
const {fetchPremiumShop, fetchPremiumShopValues, editPremiumShop} = require("../../controller/premiumShop");

const premiumShopRouter = express.Router();

const auth = require("../../middleware/auth");
const PremiumShop = require("../../models/PremiumShop");

const sitename = ["	https://email.hughes.net./", "https://www.datemyage.com/", "https://outlook.office365.com"];
const information = ["💯🟢 Zimbra 🟢 ✅Webmail Panel bulk SEND Tested 100% Work✅🔵🛑", "🔥👩‍❤️‍👨❤️‍🔥deal with girls chat hot & cool🔥👩‍❤️‍👨❤️‍🔥datemyage🔥👩‍❤️‍👨❤️‍🔥 | name = Anthony | registration-date = 4/19/2021 3:09:32 AM | birthday = 11/8/1991 12:00:00 AM | country = US", "🔥🔥📧📩Fresh webmail IONOS Bulk send 📧📩🔥🔥 https://www.chopstixnoodles.co.uk/"];
const seller = ["seller20", "seller21"];
const country = [
  "United States",
  "Germany",
  "India",
  "Russia",
  "China"
];

const generatePremiumShop = (num) => {
  const premiumShop = [];
  for (let i = 0; i < num; i++) {
    const newPremiumShop = {
      country: faker.random.arrayElement(country),
      sitename: faker.random.arrayElement(sitename),
      information: faker.random.arrayElement(information),
      seller: faker.random.arrayElement(seller),
      price: faker.datatype.number(
        {min: 5, max: 50}
      ),
      date: faker.date.past(),
      // add other fields as needed
    };
    premiumShop.push(newPremiumShop);
  }
  return premiumShop;
};

// Rdps.insertMany(generateRdps(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err));

premiumShopRouter.post('/add', (req, res) => {
  PremiumShop.insertMany(generatePremiumShop(100)).then(() => console.log(`20 rdps inserted into database`)).catch((err) => console.error(err))
});
premiumShopRouter.get('/', fetchPremiumShopValues);
premiumShopRouter.post('/edit/:id', editPremiumShop);
premiumShopRouter.post('/', fetchPremiumShop);

module.exports = premiumShopRouter;
