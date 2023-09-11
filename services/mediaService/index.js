import config from 'config'
import FileService from './fileService.js'

class MediaFacade {
    constructor() {
        const useService = config.get('fileService')
        if (useService === 'default') {
            this.service = new FileService()
        }
    }
    saveImageFile(file, folder) {
        try {
            return this.service.saveImageFile(file, folder)
        } catch (e) {
            throw e
        }
    }

    saveMDFile(file, folder) {
        try {
            return this.service.saveMDFile(file, folder)
        } catch (e) {
            throw e
        }
    }

    removeFilesFromFolder(folderName, removeAfter) {
        try {
            this.service.removeFilesFromFolder(folderName, removeAfter)
        } catch (e) {
            throw e
        }
    }

    createFolderIfNotExist(name) {
        try {
            this.service.createFolderIfNotExist(name)
        } catch (e) {
            throw e
        }
    }

    createOrUpdateArticleFiles(folderName, picture, content) {
        try {
            return this.service.createOrUpdateArticleFiles(
                folderName,
                picture,
                content
            )
        } catch (e) {
            throw e
        }
    }
}

export default new MediaFacade()
