import Router from 'express'
import ArticleController from '../controllers/articleController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { isAdminMiddleware } from '../middleware/isAdminMiddleware.js'

const router = new Router()

router.post(
    '/articles',
    [authMiddleware, isAdminMiddleware],
    ArticleController.create
)
router.put(
    '/articles/',
    [authMiddleware, isAdminMiddleware],
    ArticleController.update
)
router.get('/articles', ArticleController.getAll)
router.get('/articles/:id', ArticleController.getOne)
router.delete(
    '/articles/:id',
    [authMiddleware, isAdminMiddleware],
    ArticleController.delete
)

export default router
