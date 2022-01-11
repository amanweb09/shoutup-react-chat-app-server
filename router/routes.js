const router = require('express').Router();

const authController = require('../controllers/auth-controller')
const activateController = require('../controllers/activate-controller')

const authMiddleware = require('../middlewares/auth-middleware');

router.post('/send-otp', authController.sendOTP)
router.post('/verify-otp', authController.verifyOtp)
router.post('/activate', authMiddleware, activateController.activate)
router.get('/refresh', authController.refresh)
router.post('/logout', authMiddleware, authController.logout)

module.exports = router