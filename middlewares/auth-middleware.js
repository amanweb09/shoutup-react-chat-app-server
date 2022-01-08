const tokenService = require("../services/token-service");

const authMiddleware = async (req, res, next) => {
    try {
        const { accessToken } = req.cookies.accessToken;

        if (!accessToken) {
            throw new Error()
        }

        const userData = await tokenService.verifyAccessToken(accessToken)
        
        if (!userData) {
            throw new Error()
        }

        req.user = userData;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ err: 'Invalid Token' })
    }
}

module.exports = authMiddleware;