const jwt = require('jsonwebtoken');
const RefreshTokens = require('../models/RefreshToken')

const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '1m'
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

    async verifyAccessToken(token) {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    }

    async findRefreshToken(userId, refreshToken) {
        return RefreshTokens.findOne({ userId, token: refreshToken })
    }

    async updateRefreshToken(userId, refreshToken) {
        return await RefreshTokens.updateOne({ userId }, { token: refreshToken })
    }

}

module.exports = new TokenService;