const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const User = require('../models/user');
const UsersController = require('../controllers/users');

router.get('/',UsersController.get_all_users);

router.post('/signup', UsersController.create_user_signup);;

router.delete('/:userId', checkAuth, UsersController.delete_user);

router.post('/login', UsersController.user_login);

module.exports = router