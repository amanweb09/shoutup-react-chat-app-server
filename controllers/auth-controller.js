const otpService = require('../services/otp-service')
const hashService = require('../services/hash-service')
const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto')

class AuthController {
    async sendOTP(req, res) {
        const { phone } = req.body;

        if (!phone) {
            return res.status(422).json({ err: 'Phone field is required!' })
        }

        //generate otp
        const OTP = await otpService.generateOTP()


        // generate hash
        const ttl = 1000 * 60 * 10;     //10min
        const expires = Date.now() + ttl;
        const data = `${phone}.${OTP}.${expires}`;
        const hash = hashService.hashOTP(data);


        //send hash version of otp
        console.log(OTP);
        return res.status(200).json({
            hash: `${hash}.${expires}`,
            otp: OTP,
            phone
        })

    }
    async verifyOtp(req, res) {
        const { otp, hash, phone } = req.body;

        if (!otp || !hash || !phone) {
            return res.status(422).json({ err: 'All fields are required!' })
        }

        const [hashedOTP, expires] = hash.split('.');
        if (Date.now() > parseInt(expires)) {
            return res.status(422).json({ err: 'OTP expired!' })
        }

        const data = `${phone}.${otp}.${expires}`;


        const isValid = otpService.verifyOTP(hashedOTP, data)

        if (!isValid) {
            res.status(401).json({ err: 'invalid OTP!' })
        }

        let user;

        try {
            user = await userService.findUser({ phone })

            if (!user) {
                user = await userService.createUser({ phone })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ err: 'Something went wrong!' })
        }

        const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id });

        await tokenService.storeRefreshToken(refreshToken, user._id)
        res.cookie('refreshToken', { refreshToken }, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })

        res.cookie('accessToken', { accessToken }, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        })
        
        const userDto = new UserDto(user)
        return res.json({ user: userDto, auth: true })
    }
}

module.exports = new AuthController();