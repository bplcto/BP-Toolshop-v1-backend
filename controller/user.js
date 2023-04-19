const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const { sendPasswordResetEmail } = require('../utils/email');

const fetchUsers = async (req, res) => {
  const {keyword} = req.body;

  const query = {};

  if (keyword) {
    query.name = new RegExp(`${keyword}`, "i");
    query.email = new RegExp(`${keyword}`, "i");
  }

  try {
    const users = await User.find(query).sort({date: -1});
    res.json(users)
  } catch (err) {
    console.error(err);
    res.status(500).send({msg: "Server Error"});
  }
}

const changeUserStatus = async (req, res) => {
  const {userid} = req.params;

  try {
    const user = await User.findById(userid);
    user.allowed = ! user.allowed;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({msg: "Server Error"});
  }
}

const forgotPassword = async (req, res) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }
      const token = uuidv4();
      const expires = Date.now() + 3600000; // 1 hour
      await User.findByIdAndUpdate(user._id, {
        resetPasswordToken: token,
        resetPasswordExpires: expires
      });
      await sendPasswordResetEmail(email, token);
      res.json({ message: 'Password reset email sent' });
  } catch (err) {  
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  changeUserStatus,
  fetchUsers,
  forgotPassword
}
