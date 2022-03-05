const { User } = require('../models/user.model');

exports.getAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      where: { status: 'active' }
    });
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.log(error);
  }
};
