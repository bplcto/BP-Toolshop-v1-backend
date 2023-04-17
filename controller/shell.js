const Shell = require('../models/Shell');

const fetchShellValues = async (req, res) => {
  const results = await Shell.aggregate([{
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
const fetchShell = async (req, res) => {
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
    const cnt = await Shell.countDocuments(query);
    const totalCnt = await Shell.countDocuments();
    const shells = await Shell.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: shells, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editShell = async (req, res) => {
  const {shell} = req.body;
  const {id} = req.params;

  try {
    const changedShell = await Shell.findByIdAndUpdate(id, {
      country: shell.country,
      login: shell.login,
      information: shell.information,
      seller: shell.seller,
      price: shell.price
    }, {new: true});

    res.json(changedShell);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addShell = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchShell,
  editShell,
  addShell,
  fetchShellValues
};
