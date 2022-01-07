const crypto = require('crypto')
const hashService = require('./hash-service')

const twilio = require('twilio')(process.env.SMS_SID, process.env.SMS_AUTH_TOKEN, {
    lazyLoading: true
})

class OtpService {
    async generateOTP() {
        const OTP = await crypto.randomInt(1000, 9999);
        return OTP;
    }
    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: process.env.SMS_PHONE_NUMBER,
            body: `Your Shoutup OTP is ${otp}`
        })
    }
    verifyOTP(hashedOtp, data) {
        let computedHash = hashService.hashOTP(data);

        if (computedHash === hashedOtp) {
            return true
        }

        return false;
    }
}

module.exports = new OtpService();