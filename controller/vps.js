const Vps = require('../models/Vps');

const fetchVpsValues = async (req, res) => {
  const results = await Vps.aggregate([{
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
const fetchVps = async (req, res) => {
  const {
    country,
    information,
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
  

  if (detect_hosting && detect_hosting !== "All") 
    query.detect_hosting = new RegExp(`${detect_hosting}`, "i");

  if (information && information !== "All") 
    query.information = new RegExp(`${information}`, "i");

  try {
    const cnt = await Vps.countDocuments(query);
    const totalCnt = await Vps.countDocuments();
    const vps = await Vps.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: vps, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editVps = async (req, res) => {
  const {vps} = req.body;
  const {id} = req.params;

  try {
    const changedVps = await Vps.findByIdAndUpdate(id, {
      country: vps.country,
      login: vps.login,
      information: vps.information,
      seller: vps.seller,
      price: vps.price
    }, {new: true});

    res.json(changedVps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addVps = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchVps,
  editVps,
  addVps,
  fetchVpsValues
};
