// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfwpgiLxXNla6DjRfdOQKG9-sbCFYdYJI",
  authDomain: "cs4261app.firebaseapp.com",
  projectId: "cs4261app",
  storageBucket: "cs4261app.appspot.com",
  messagingSenderId: "592317435495",
  appId: "1:592317435495:web:708216c0e7b5580d4c4ec2"
};

const app = initializeApp(firebaseConfig);
//const authentication = getAuth(app);

export const database = getFirestore(app);

export const auth = getAuth(app); 