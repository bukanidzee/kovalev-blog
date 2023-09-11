import {check} from 'express-validator'

class UserValidator {
  validateEmail(){
    return check('email', 'Некорректный email').isEmail()
  }

  validatePassword(){
    return check('password', 'Минимальная длина пароля - 6 символов').isLength({min:6})
  }

  validateLoginEmail() {
    return check('email', 'Некорректный email').normalizeEmail().isEmail()
  }
}

export default new UserValidator()
