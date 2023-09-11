import Article from '../models/Article.js'
import mediaService from './mediaService/index.js'
import * as uuid from 'uuid'
import cttjs from 'cyrillic-to-translit-js'

class ArticleService {
    async create(article, picture, content) {
        const cttjsObject = new cttjs({ preset: 'ru' })
        const folderName = cttjsObject
            .transform(article.title, '_')
            .toLowerCase()
        console.log(folderName)
        const { pictureFileName, contentFileName } =
            mediaService.createOrUpdateArticleFiles(
                folderName,
                picture,
                content
            )

        const createdPost = await Article.create({
            ...article,
            ...{ picture: pictureFileName },
            ...{ content: contentFileName },
            folderName
        })
        return createdPost
    }

    async getAll() {
        const articles = await Article.find()
            .select('-content')
            .sort({ publishedDate: -1 })
        return articles
    }

    async getOne(id) {
        if (!id) {
            throw new Error('Id not found')
        }
        const article = await Article.findById(id)
        return article
    }

    async update(article, picture, content, id) {
        if (!id) {
            throw new Error('Id not found')
        }
        const folderName = await Article.findById(id).folderName
        const { pictureFileName, contentFileName } =
            mediaService.createOrUpdateArticleFiles(
                folderName,
                picture,
                content
            )
        const updated = await Article.findByIdAndUpdate(
            article._id,
            {
                ...article,
                ...{ picture: pictureFileName },
                ...{ content: contentFileName },
                folderName
            },
            {
                new: true
            }
        )
        return updated
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id not found')
        }
        const folderName = await Article.findById(id).folderName
        mediaService.removeFilesFromFolder(folderName, true)
        const article = await Article.deleteOne({ _id: id })
        return article
    }
}

export default new ArticleService()
