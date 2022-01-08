const router = require('express').Router();

const authController = require('../controllers/auth-controller')
const activateController = require('../controllers/activate-controller')

router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp', authController.verifyOtp)
router.post('/activate', activateController)

module.exports = router