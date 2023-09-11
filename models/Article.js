import { Schema, Types, model } from 'mongoose'
import Comment from './Comment.js'

const Article = new Schema({
    // author: {type: Types.ObjectId, ref:'User', required: true},
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true, unique: true },
    lastUpdated: { type: Date, default: Date.now },
    picture: { type: String, unique: true },
    shortDescription: { type: String, required: true },
    folderName: { type: String, required: true, unique: true, immutable: true }
    // comments: [{ type: Types.ObjectId, ref: 'Comment' }]
})

Article.post('deleteOne', (articleId, next) => {
    Comment.deleteMany({ article: articleId })
    next()
})

export default model('Article', Article)
