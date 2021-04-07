export class FirestoreService {
    db = null;
    constructor(db) {
        this.db = db;
    }
    save(user) {
        return this.db.collection("users").add(user);
    }
    findById(id) {
        return this.db.collection(`users`).doc('WBIPJI8z6GRTpw51O3wm').get();
    }
}