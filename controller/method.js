const Method = require('../models/Method');

const fetchMethodValues = async (req, res) => {
  const results = await Method.aggregate([{
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
const fetchMethod = async (req, res) => {
  const {
    country,
    seller,
    description,
    limit,
    page
  } = req.body;

  const skip = (page - 1) * (limit || 10);

  const query = {};

  if (country && country !== "All") 
    query.country = country;

  if (seller && seller !== "All") 
    query.seller = seller;  

  if (description) 
    query.description = new RegExp(`${description}`, "i");

  try {
    const cnt = await Method.countDocuments(query);
    const totalCnt = await Method.countDocuments();
    const methods = await Method.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: methods, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editMethod = async (req, res) => {
  const {method} = req.body;
  const {id} = req.params;

  try {
    const changedMethod = await Method.findByIdAndUpdate(id, {
      country: method.country,
      description: method.description,
      seller: method.seller,
      price: method.price
    }, {new: true});

    res.json(changedMethod);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addMethod = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchMethod,
  editMethod,
  addMethod,
  fetchMethodValues
};
