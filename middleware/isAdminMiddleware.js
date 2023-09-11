import User from '../models/User.js'

export const isAdminMiddleware = async (req, res, next) => {
    const user = await User.findById(req.user.userId, {})

    if (!user.isAdmin) {
        return res.status(403).json({
            message: 'Вы не уполномочены на данное действие'
        })
    }

    next()
}
