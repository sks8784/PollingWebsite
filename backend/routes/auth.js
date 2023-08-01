const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { check } = require('express-validator');
const { loginUser, registerUser, getUser } = require('../controllers/userController');


router.route('/createUser').post([
    check('name', 'Length of name must be greater than 2').isLength({ min: 3 }),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password length must be greater than 5').isLength({ min: 5 })
], registerUser);

router.route('/login').post([
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password length must be greater than 5').isLength({ min: 5 })
], loginUser);

router.route('/getuser').get(fetchuser, getUser);

module.exports = router;