const Lead = require('../models/Lead');

const fetchLeadValues = async (req, res) => {
  const results = await Lead.aggregate([{
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
const fetchLead = async (req, res) => {
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
    const cnt = await Lead.countDocuments(query);
    const totalCnt = await Lead.countDocuments();
    const leads = await Lead.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: leads, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editLead = async (req, res) => {
  const {lead} = req.body;
  const {id} = req.params;

  try {
    const changedLead = await Lead.findByIdAndUpdate(id, {
      country: lead.country,
      emailn: lead.emailn,
      description: lead.description,
      seller: lead.seller,
      price: lead.price
    }, {new: true});

    res.json(changedLead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addLead = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchLead,
  editLead,
  addLead,
  fetchLeadValues
};
