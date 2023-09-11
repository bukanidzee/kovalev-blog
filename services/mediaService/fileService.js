import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

class FileService {
    saveImageFile(file, folder) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static', folder, fileName)
            file.mv(filePath)
            return fileName
        } catch (e) {
            throw e
        }
    }

    saveMDFile(file, folder) {
        try {
            const fileName = file.name + '.md'
            const filePath = path.resolve('static', folder, fileName)
            file.mv(filePath)
            return fileName
        } catch (e) {
            throw e
        }
    }

    removeFilesFromFolder(folderName, removeAfter) {
        try {
            const directory = path.resolve(
                __dirname,
                'static',
                'articles',
                folderName
            )
            fs.readdir(directory, (err, files) => {
                if (err) throw err

                for (const file of files) {
                    fs.unlink(path.join(directory, file), (err) => {
                        if (err) throw err
                    })
                }
            })
            if (removeAfter) {
                fs.rmSync(directory, { recursive: true, force: true })
            }
        } catch (e) {
            throw e
        }
    }

    createFolderIfNotExist(name) {
        try {
            fs.mkdirSync(path.resolve(__dirname, 'static', 'articles') + name, {
                recursive: true
            })
        } catch (e) {
            throw e
        }
    }

    createOrUpdateArticleFiles(folderName, picture, content) {
        try {
            this.createFolderIfNotExist(folderName)
            this.removeFilesFromFolder(folderName, false)
            const pictureFileName = this.saveImageFile(picture, folderName)
            const contentFileName = this.saveMDFile(content, folderName)
            return { pictureFileName, contentFileName }
        } catch (e) {
            throw e
        }
    }
}

export default FileService
