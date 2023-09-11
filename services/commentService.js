import Comment from '../models/Comment.js'

class CommentService {
    async create(comment, authorId) {
        if (comment.relatedTo) {
            const relatedComment = await Comment.findById(comment.relatedTo)
            if (!relatedComment) {
                throw new Error('Related comment not found')
            }
        }
        const createdPost = await Comment.create({
            ...comment,
            author: authorId
        })
        return createdPost
    }

    async getAll(articleId) {
        const comments = await Comment.find({ article: articleId })
        return comments
    }

    // async getOne(id) {
    //   if (!id) {
    //     throw new Error('Id not found')
    //   }
    //   const comment = await Comment.findById(id)
    //   return comment
    // }

    async update(comment) {
        if (!comment._id) {
            throw new Error('Id not found')
        }
        const updated = await Comment.findByIdAndUpdate(comment._id, comment, {
            new: true
        })
        return updated
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id not found')
        }
        const comment = await Comment.findByIdAndDelete(id)
        return comment
    }
}

export default new CommentService()
