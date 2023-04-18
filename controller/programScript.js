const ProgramScript = require('../models/ProgramScript');

const fetchProgramScriptValues = async (req, res) => {
  const results = await ProgramScript.aggregate([{
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
const fetchProgramScript = async (req, res) => {
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
    const cnt = await ProgramScript.countDocuments(query);
    const totalCnt = await ProgramScript.countDocuments();
    const programScripts = await ProgramScript.find(query).skip(skip || 0).limit(limit || 10);
    res.json({cnt, data: programScripts, totalCnt});
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const editProgramScript = async (req, res) => {
  const {programScript} = req.body;
  const {id} = req.params;

  try {
    const changedProgramScript = await ProgramScript.findByIdAndUpdate(id, {
      country: programScript.country,
      description: programScript.description,
      seller: programScript.seller,
      price: programScript.price
    }, {new: true});

    res.json(changedProgramScript);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
};

const addProgramScript = async (req, res) => {
  const {id, rdp} = req.body;
};

module.exports = {
  fetchProgramScript,
  editProgramScript,
  addProgramScript,
  fetchProgramScriptValues
};
