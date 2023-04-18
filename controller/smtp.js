const Smtp = require('../models/Smtp');

const fetchSmtpValues = async (req, res) => {
  const results = await Smtp.aggregate([{
      $group: {
        _id: null,
        country: {
          $addToSet: "$country"
        },
        webmail: {
          $addToSet: "$webmail"
        },
        seller: {
          $addToSet: "$seller"
        }
      }
    },]);
  res.json(results[0]);
};
const fetchSmtp = async (req, res) => {
  const {
    country,
    smtpid,
    webmail,
    seller,
    detect_hosting,
    limit,
    page
  } = req.body;

  const skip = (page - 1) * (limit || 10);

  const query = {};

  if (country && country !== "All") 
    query.country = country;

  if (webmail && webmail !== "All") 
    query.webmail = webmail;

  if (seller && seller !== "All") 
    query.seller = seller;  

  if (smtpid) 
    query.smtpid = new RegExp(`${smtpid}`, "i");

  if (detect_hosting) 
    query.detect_hosting = new RegExp(`${detect_hosting}`, "i");

  try {
    const cnt = await Smtp.countDocuments(query);
    const totalCnt = await Smtp.countDocuments();
    const smtps = await Smtp.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: smtps, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editSmtp = async (req, res) => {
  const {smtp} = req.body;
  const {id} = req.params;

  try {
    const changedSmtp = await Smtp.findByIdAndUpdate(id, {
      country: smtp.country,
      domain: smtp.domain,
      webmail: smtp.webmail,
      seller: smtp.seller,
      price: smtp.price
    }, {new: true});

    res.json(changedSmtp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addSmtp = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchSmtp,
  editSmtp,
  addSmtp,
  fetchSmtpValues
};
