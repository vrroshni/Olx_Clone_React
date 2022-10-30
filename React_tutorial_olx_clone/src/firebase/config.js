import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBL9Q9ajqLe3DCfgD_O-qJCgLIxr3lNojA",
    authDomain: "olxclone-45ec0.firebaseapp.com",
    projectId: "olxclone-45ec0",
    storageBucket: "olxclone-45ec0.appspot.com",
    messagingSenderId: "245690065503",
    appId: "1:245690065503:web:0edc1402c14111d4b731ea",
    measurementId: "G-P42HM5WJZ4"
  };
 export default firebase.initializeApp(firebaseConfig)