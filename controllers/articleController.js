import articleService from '../services/articleService.js'

class ArticleController {
    async create(req, res) {
        try {
            const article = await articleService.create(
                req.body,
                req.files.picture,
                req.files.content
            )
            res.status(201).json(article)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(_, res) {
        try {
            const articles = await articleService.getAll()
            res.status(200).json(articles)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const article = await articleService.getOne(id)
            res.status(200).json(article)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async update(req, res) {
        try {
            const article = await articleService.update(
                req.body,
                req.files.picture,
                req.files.content,
                req.params.id
            )
            res.status(200).json(article)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const article = await articleService.delete(req.params.id)
            return res.json(article)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new ArticleController()
