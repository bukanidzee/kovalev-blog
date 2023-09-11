import { Schema, Types, model } from 'mongoose'

const Comment = new Schema({
    author: { type: Types.ObjectId, ref: 'User', required: true },
    article: { type: Types.ObjectId, ref: 'Article', required: true },
    relatedTo: { type: Types.ObjectId, ref: 'Comment' },
    content: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    likes: [{ type: Types.ObjectId, ref: 'User' }]
})

export default model('Comment', Comment)
