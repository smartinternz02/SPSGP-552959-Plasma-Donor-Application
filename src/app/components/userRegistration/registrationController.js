const UserModel = require('./userModel');

exports.createRegistrationControllerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new UserModel({
      name,
      email,
      password
    });

    await user.save();

    res.status(200).json({
      status: true,
      message: 'Admin registered successfully'
    });
  } catch (error) {
    console.error('Error in creating admin:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to register admin'
    });
  }
};
