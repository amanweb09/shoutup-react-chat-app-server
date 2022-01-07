const jwt = require('jsonwebtoken');
const RefreshTokens = require('../models/RefreshToken')

const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1h'
        })

        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y'
        })

        return { accessToken, refreshToken }
    }
    async storeRefreshToken(token, userId) {
        try {
            const refToken = new RefreshTokens({
                token, userId
            })
            await refToken.save();
            
        } catch (error) {
            console.log(error.message);
        }
    }

}

module.exports = new TokenService;