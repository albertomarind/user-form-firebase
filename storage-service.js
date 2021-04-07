export class StorageService {
    storage = null;
    constructor(storage) {
        this.storage = storage;
    }
    uploadFile(file, path) {
        return this.storage.ref().child(path).put(file);
    }
    getUrlImage(path) {
        return this.storage.ref().child(path).getDownloadURL();
    }
}