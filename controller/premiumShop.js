const PremiumShop = require('../models/PremiumShop');

const fetchPremiumShopValues = async (req, res) => {
  const results = await PremiumShop.aggregate([{
      $group: {
        _id: null,
        country: {
          $addToSet: "$country"
        },
        seller: {
          $addToSet: "$seller"
        }
      }
    },]);
  res.json(results[0]);
};
const fetchPremiumShop = async (req, res) => {
  const {
    country,
    sitename,
    information,
    seller,
    limit,
    page
  } = req.body;

  const skip = (page - 1) * (limit || 10);

  const query = {};

  if (country && country !== "All") 
    query.country = country;

  if (seller && seller !== "All") 
    query.seller = seller;  

  if (information) 
    query.information = new RegExp(`${information}`, "i");

  if (sitename) 
    query.sitename = new RegExp(`${sitename}`, "i");

  try {
    const cnt = await PremiumShop.countDocuments(query);
    const totalCnt = await PremiumShop.countDocuments();
    const premiumShops = await PremiumShop.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: premiumShops, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editPremiumShop = async (req, res) => {
  const {premiumShop} = req.body;
  const {id} = req.params;

  try {
    const changedPremiumShop = await PremiumShop.findByIdAndUpdate(id, {
      country: premiumShop.country,
      information: premiumShop.information,
      sitename: premiumShop.sitename,
      seller: premiumShop.seller,
      price: premiumShop.price
    }, {new: true});

    res.json(changedPremiumShop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addPremiumShop = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchPremiumShop,
  editPremiumShop,
  addPremiumShop,
  fetchPremiumShopValues
};
