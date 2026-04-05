const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const { register, login } = require('../controllers/auth.controller');

// Apply rate limiting specifically on the auth routes to prevent brute-forcing
router.use(authLimiter);

router.post('/register', register);
router.post('/login', login);

module.exports = router;