const PhpMailer = require('../models/PhpMailer');

const fetchPhpMailerValues = async (req, res) => {
  const results = await PhpMailer.aggregate([{
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
const fetchPhpMailer = async (req, res) => {
  const {
    country,
    id,
    seller,
    detect_hosting,
    limit,
    page
  } = req.body;

  const skip = (page - 1) * (limit || 10);

  const query = {};

  if (country && country !== "All") 
    query.country = country;

  if (seller && seller !== "All") 
    query.seller = seller;  

  if (id) 
    query.id = new RegExp(`${id}`, "i");

  if (detect_hosting) 
    query.detect_hosting = new RegExp(`${detect_hosting}`, "i");

  try {
    const cnt = await PhpMailer.countDocuments(query);
    const totalCnt = await PhpMailer.countDocuments();
    const phpmailers = await PhpMailer.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: phpmailers, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editPhpMailer = async (req, res) => {
  const {phpmailer} = req.body;
  const {id} = req.params;

  try {
    const changedPhpMailer = await PhpMailer.findByIdAndUpdate(id, {
      country: phpmailer.country,
      seller: phpmailer.seller,
      price: phpmailer.price
    }, {new: true});

    res.json(changedPhpMailer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addPhpMailer = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchPhpMailer,
  editPhpMailer,
  addPhpMailer,
  fetchPhpMailerValues
};
