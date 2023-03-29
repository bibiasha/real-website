import firebase from "firebase"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt_cvcDUy1OUWjl9DNTFzeT3ZJHgXYH4o",
  authDomain: "mr-signboards.firebaseapp.com",
  projectId: "mr-signboards",
  storageBucket: "mr-signboards.appspot.com",
  messagingSenderId: "245025227676",
  appId: "1:245025227676:web:455a3b0cb0ae1cb8a13e59",
  measurementId: "G-ZPZ13VWVM1"
};  

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth};