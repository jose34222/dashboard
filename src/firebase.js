// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importación faltante

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC64FfO3XmamEViI8p8fBAq6o6xqglXGuo",
  authDomain: "helpu-login.firebaseapp.com",
  projectId: "helpu-login",
  storageBucket: "helpu-login.appspot.com",
  messagingSenderId: "721582080212",
  appId: "1:721582080212:web:e291edeef673d6687dfb41",
  measurementId: "G-MHMR0VDJLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;