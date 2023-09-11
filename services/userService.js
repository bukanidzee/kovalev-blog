import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { getNameFromEmail } from '../utils/username.js'
import jwt from 'jsonwebtoken'
import config from 'config'
import mediaService from './mediaService/index.js'

class UserService {
    async login(res, password, email) {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                password: 'Неверный пользователь или пароль'
            })
            return {}
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({
                password: 'Неверный пользователь или пароль'
            })
            return {}
        }

        const token = jwt.sign({ userId: user._id }, config.get('jwtSecret'), {
            expiresIn: '1h'
        })

        return {
            token,
            userId: user._id,
            name: user.name,
            picture: user.picture,
            isAdmin: user.isAdmin
        }
    }

    async register(res, email, password, name, picture) {
        let fileName
        if (picture) {
            fileName = mediaService.saveImageFile(picture, 'avatars')
        }

        let candidate = await User.findOne({ email })
        if (candidate) {
            res.status(400).json({ email: 'Такой пользователь существует' })
            return false
        }

        candidate = await User.findOne({ name })
        if (candidate) {
            res.status(400).json({ name: 'Такое имя пользователя существует' })
            return false
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        await User.create({
            email,
            password: hashedPassword,
            name: name ? name : getNameFromEmail(email),
            ...(fileName ? { picture: fileName } : {})
        })
        return true
    }
}

export default new UserService()
