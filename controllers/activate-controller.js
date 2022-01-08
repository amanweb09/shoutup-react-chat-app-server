const Jimp = require('jimp');
const path = require('path');
const UserDto = require('../dtos/user-dto');
const userService = require('../services/user-service');

class ActivateController {
    async activate(req, res) {
        const { name, avatar } = req.body;

        if (!name || !avatar) {
            return res.status(422).json({ err: 'All fields are required!' })
        }

        //as we are receiving image as base64, we need to convert it into buffer
        const buffer = Buffer.from(avatar.replace(/^data:image\/png;base64,/, ''), 'base64');

        const imagePath = `${Date.now()}-${Math.round(Math.random() * 1E9)}.png`
        try {

            //for compressing and resizing the imagw
            // const jimpResp = await Jimp.read(buffer);
            const jimpResp = await Jimp.read(buffer)
            jimpResp
                .resize(150, Jimp.AUTO)
                .write(path.resolve(__dirname, `../storage/${imagePath}`)) //width and height of the image we want

        } catch (error) {
            console.log('jimp error', error);
            return res.status(500).json({ err: 'Something went wrong :(' })
        }

        try {

            const user = await userService.findUser({ _id: req.user._id });

            if (!user) {
                return res.status(404).json({ err: 'User not found!' })
            }

            user.activated = true;
            user.name = name;
            user.avatar = `/storage/${imagePath}`

            await user.save();
            res.status(200).json({ user: new UserDto(user), auth: true })
        } catch (error) {
            console.log('db error');
            return res.status(500).json({ err: 'Something went wrong :(' })

        }


    }
}

module.exports = new ActivateController()