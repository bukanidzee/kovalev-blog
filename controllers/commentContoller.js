import commentService from '../services/commentService.js'

class CommentController {
    async create(req, res) {
        try {
            const comment = await commentService.create(
                req.body,
                req.user.userId
            )
            res.status(201).json(comment)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async getAll(_, res) {
        try {
            const comments = await commentService.getAll(articleId)
            res.json(comments)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    // async getOne(req, res) {
    //   try {
    //     const {id} = req.params
    //     const comment = await commentService.getOne(id)
    //     res.json(comment)
    //   } catch (e){
    //     res.status(500).json(e.message)
    //   }
    // }

    async update(req, res) {
        try {
            const comment = await commentService.update(req.body)
            res.status(200).json(comment)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }

    async delete(req, res) {
        try {
            const comment = await commentService.delete(req.params.id)
            return res.status(200).json(comment)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new CommentController()
