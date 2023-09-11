import Comment from '../models/Comment.js'
import User from '../models/User.js'

export const isOwnerOrAdminMiddleware =
    (Model, ownerField) => (req, res, next) => {
        const user = User.findById(req.user.userId)
        const object = Model.findById(req.params.id)

        if (!user.isAdmin && object[ownerField] !== req.user.userId) {
            return res.status(403).json({
                message: 'Вы не уполномочены на данное действие'
            })
        }

        next()
    }
