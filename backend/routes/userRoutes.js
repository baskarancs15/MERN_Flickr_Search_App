const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  getMe,
  getTagImages
} = require('../controller/user.controller')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.get('/search/photos', getTagImages)

module.exports = router