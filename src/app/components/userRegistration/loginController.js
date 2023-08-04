const UserModel = require('./userModel');

exports.createLoginControllerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({
        status: false,
        message: 'Admin not found'
      });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({
        status: false,
        message: 'Incorrect password'
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'Admin login successful'
    });
  } catch (error) {
    console.error('Error in admin login:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to login'
    });
  }
};
