const Rdps = require("../models/Rdps");

const fetchRdpsValues = async (req, res) => {
  const results = await Rdps.aggregate([
    {
      $group: {
        _id: null,
        country: { $addToSet: "$country" },
        windows: { $addToSet: "$windows" },
        access: { $addToSet: "$access" },
        seller: { $addToSet: "$seller" },
      },
    },
  ]);
  res.json(results[0]);
};
const fetchRdps = async (req, res) => {
  const { country, windows, access, seller, detect_hosting } = req.body;

  const query = {};

  if (country && country !== "All") query.country = country;
  if (windows && windows !== "All") query.windows = windows;
  if (access && access !== "All") query.access = access;
  if (seller && seller !== "All") query.seller = seller;
  if (detect_hosting && detect_hosting !== "All")
    query.detect_hosting = new RegExp(`${detect_hosting}`, "i");

  try {
    const rdps = await Rdps.find(query).sort({ date: -1 });
    res.json(rdps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

const editRdp = async (req, res) => {
  const { id, rdp } = req.body;
};

const addRdp = async (req, res) => {
  const { id, rdp } = req.body;
};

module.exports = {
  fetchRdps,
  editRdp,
  addRdp,
  fetchRdpsValues,
};
