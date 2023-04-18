const Rdps = require("../models/Rdps");

const fetchRdpsValues = async (req, res) => {
  const results = await Rdps.aggregate([{
      $group: {
        _id: null,
        country: {
          $addToSet: "$country"
        },
        windows: {
          $addToSet: "$windows"
        },
        access: {
          $addToSet: "$access"
        },
        seller: {
          $addToSet: "$seller"
        }
      }
    },]);
  res.json(results[0]);
};
const fetchRdps = async (req, res) => {

  console.log(req.body);

  const {
    country,
    windows,
    access,
    seller,
    detect_hosting,
    limit,
    page
  } = req.body;

  const skip = (page - 1) * (limit || 10);

  const query = {};

  if (country && country !== "All") 
    query.country = country;
  

  if (windows && windows !== "All") 
    query.windows = windows;
  

  if (access && access !== "All") 
    query.access = access;
  

  if (seller && seller !== "All") 
    query.seller = seller;
  

  if (detect_hosting && detect_hosting !== "All") 
    query.detect_hosting = new RegExp(`${detect_hosting}`, "i");

  try {
    const cnt = await Rdps.countDocuments(query);
    const totalCnt = await Rdps.countDocuments();
    const rdps = await Rdps.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: rdps, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editRdp = async (req, res) => {
  const {rdp} = req.body;
  const {id} = req.params;

  try {
    const changedRdp = await Rdps.findByIdAndUpdate(id, {
      country: rdp.country,
      windows: rdp.windows,
      access: rdp.access,
      seller: rdp.seller,
      price: rdp.price
    }, {new: true});

    res.json(changedRdp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addRdp = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchRdps,
  editRdp,
  addRdp,
  fetchRdpsValues
};
