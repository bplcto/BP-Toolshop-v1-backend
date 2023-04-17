const User = require('../models/User');

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

module.exports = {
  changeUserStatus,
  fetchUsers
}
