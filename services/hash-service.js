const crypto = require('crypto')

class HashService {
    hashOTP(otp) {
        return crypto
            .createHmac('sha256', process.env.HASH_SECRET)
            .update(otp)
            .digest('hex')
    }
}

module.exports = new HashService()