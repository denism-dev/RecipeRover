const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

router.post('/registerUser', UserController.registerUser)

router.post('/loginUser', UserController.loginUser)

router.post('/logoutUser', UserController.logoutUser)

module.exports = router