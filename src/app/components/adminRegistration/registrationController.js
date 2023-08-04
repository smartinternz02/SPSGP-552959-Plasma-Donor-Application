const AdminModel = require('./adminLgModel');

exports.createRegistrationController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const admin = new AdminModel({
      name,
      email,
      password
    });

    await admin.save();

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
