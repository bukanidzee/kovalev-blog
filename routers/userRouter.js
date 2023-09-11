import {Router} from 'express';
import UserController from '../controllers/userController.js'
import UserValidator from '../validation/UserValidator.js'

const router = new Router()

router.post('/auth/login',
            [UserValidator.validateLoginEmail(),
             UserValidator.validatePassword()],
            UserController.login)
router.post('/auth/registration',
            [UserValidator.validateEmail(),
             UserValidator.validatePassword()],
            UserController.register)

export default router
