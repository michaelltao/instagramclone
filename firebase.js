import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDC3laBM-rHkGsSyllHXRsQLbziJDMc3xE",
    authDomain: "instagram-clone-a0a22.firebaseapp.com",
    projectId: "instagram-clone-a0a22",
    storageBucket: "instagram-clone-a0a22.appspot.com",
    messagingSenderId: "745263664512",
    appId: "1:745263664512:web:b506b04727f67c6e324565"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };