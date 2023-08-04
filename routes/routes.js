const express = require('express');
const router = express.Router();

const AdminModel = require('../src/app/components/adminRegistration/adminLgModel');
const registrationController = require('../src/app/components/adminRegistration/registrationController');
const loginController = require('../src/app/components/adminRegistration/loginController');
const UserModel = require('../src/app/components/userRegistration/userModel');
const registrationControllerUser = require('../src/app/components/userRegistration/registrationController');
const loginControllerUser = require('../src/app/components/userRegistration/loginController');
const adminController = require('../src/app/components/admin/adminController');

router.route('/admin/getAll').get(adminController.getDataController);
router.route('/admin/create').post(adminController.createAdminController);
router.route('/admin/update/:id').patch(adminController.updateAdminDataController)
router.route('/admin/remove/:id').delete(adminController.deleteAdminController);
router.route('/admin/register').post(registrationController.createRegistrationController);
router.route('/admin/login').post(loginController.createLoginController);
router.route('/user/register').post(registrationControllerUser.createRegistrationControllerUser);
router.route('/user/login').post(loginControllerUser.createLoginControllerUser);

module.exports = router;
