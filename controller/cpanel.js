const Cpanel = require('../models/Cpanel');

const fetchCpanelValues = async (req, res) => {
  const results = await Cpanel.aggregate([{
      $group: {
        _id: null,
        country: {
          $addToSet: "$country"
        },
        ssl: {
          $addToSet: "$ssl"
        },
        seller: {
          $addToSet: "$seller"
        }
      }
    },]);
  res.json(results[0]);
};
const fetchCpanel = async (req, res) => {
  const {
    country,
    tld,
    ssl,
    seller,
    detect_hosting,
    limit,
    page
  } = req.body;

  const skip = (page - 1) * (limit || 10);

  const query = {};

  if (country && country !== "All") 
    query.country = country;

  if (ssl && ssl !== "All") 
    query.ssl = ssl;

  if (seller && seller !== "All") 
    query.seller = seller;  

  if (tld) 
    query.tld = new RegExp(`${tld}`, "i");

  if (detect_hosting) 
    query.detect_hosting = new RegExp(`${detect_hosting}`, "i");

  try {
    const cnt = await Cpanel.countDocuments(query);
    const totalCnt = await Cpanel.countDocuments();
    const cpanels = await Cpanel.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: cpanels, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editCpanel = async (req, res) => {
  const {cpanel} = req.body;
  const {id} = req.params;

  try {
    const changedCpanel = await Cpanel.findByIdAndUpdate(id, {
      country: cpanel.country,
      ssl: cpanel.ssl,
      seller: cpanel.seller,
      price: cpanel.price
    }, {new: true});

    res.json(changedCpanel);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addCpanel = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchCpanel,
  editCpanel,
  addCpanel,
  fetchCpanelValues
};
