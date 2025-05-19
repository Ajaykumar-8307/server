const express = require('express');
const router = express.Router();
const {UserControl, Userlogin, home, Delete, update} = require('../controller/usercontroller');

router.route('/').get(home);
router.route('/register').post(UserControl);
router.route('/login').post(Userlogin);
router.route('/delete').post(Delete);
router.route('/update').post(update);

module.exports = router