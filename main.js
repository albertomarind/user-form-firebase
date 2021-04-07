import {
    FirestoreService
} from "./firestore-service.js";
import {
    StorageService
} from "./storage-service.js";


document.getElementsByTagName('form')[0].addEventListener('submit', async (e) => {
    e.preventDefault();
    let file = e.target.elements[0].files[0];
    let email = e.target.elements[1].value;
    let password = e.target.elements[2].value;
    let checkbox = e.target.elements[3].checked;
    let firestoreService = new FirestoreService(firebase.firestore());
    let storageService = new StorageService(firebase.storage());
    let user = {
        email,
        password,
        checkbox,
        image: new Date().getTime() + '_' + file.name
    };
    try {
        await firestoreService.save(user);
        await storageService.uploadFile(file, user.image);
        console.log('Exito');
    } catch (err) {
        console.error('Error: ', err);
    }
});

document.getElementById('getLastUser').addEventListener('click', async (e) => {
    let firestoreService = new FirestoreService(firebase.firestore());
    let storageService = new StorageService(firebase.storage());
    let user = await firestoreService.findById('WBIPJI8z6GRTpw51O3wm');
    console.log(user.id);
    console.log(user.data());
    let form = document.getElementsByTagName('form')[0];
    form.elements[1].value = user.data().email;
    form.elements[2].value = user.data().password;
    form.elements[3].setAttribute('checked', user.data().checked);
    document.getElementById('imagen').src = await storageService.getUrlImage(user.data().image);
});