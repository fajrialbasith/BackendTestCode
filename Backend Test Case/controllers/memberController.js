const Member = require('../models/member');

const getAllMembers = async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
};

module.exports = {
  getAllMembers
};
