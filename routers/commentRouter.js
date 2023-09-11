import Router from 'express'
import CommentController from '../controllers/commentContoller.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { isOwnerOrAdminMiddleware } from '../middleware/isOwnerOrAdminMiddleware.js'
import Comment from '../models/Comment.js'

const router = new Router()

router.post('/comments', authMiddleware, CommentController.create)
router.put(
    '/comments/:id',
    [authMiddleware, isOwnerOrAdminMiddleware(Comment, 'author')],
    CommentController.update
)
router.get('/comments', CommentController.getAll)
// router.get('/comments/:id', CommentController.getOne)
router.delete(
    '/comments/:id',
    [authMiddleware, isOwnerOrAdminMiddleware(Comment, 'author')],
    CommentController.delete
)

export default router
