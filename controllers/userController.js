import UserService from '../services/userService.js'
import { validationResult } from 'express-validator'

class UserController {
    async login(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const { password, email } = req.body

            const { token, userId, name, picture, isAdmin } =
                await UserService.login(res, password, email)
            if (token) {
                res.json({ token, userId, name, picture, isAdmin })
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }
            const { email, password, name } = req.body

            const picture = req?.files?.picture

            const isRegistrate = await UserService.register(
                res,
                email,
                password,
                name,
                picture
            )
            if (isRegistrate) {
                res.status(201).json({ message: 'Пользователь успешно создан' })
            }
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new UserController()
