const express = require('express');
const { signup, login } = require('../backened/Controllers/userController.js'); // Ensure correct path
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
