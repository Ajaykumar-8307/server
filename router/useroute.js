const express = require('express');
const router = express.Router();
const {UserControl} = require('../controller/usercontroller');

router.route('/register').post(UserControl);

module.exports = router