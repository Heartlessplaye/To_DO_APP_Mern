const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getLoggedInUser
} = require('../controller/userController')
const {ProtectUser} = require('../middleware/authMiddleware')

router.get('/me',ProtectUser,getLoggedInUser);
router.post('/',registerUser);
router.post('/login', loginUser);

module.exports = router;