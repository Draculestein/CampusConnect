// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoOiY4qU7L56iKHnfDwfrgJpBvppoH2qo",
  authDomain: "thinkspace-d7f77.firebaseapp.com",
  projectId: "thinkspace-d7f77",
  storageBucket: "thinkspace-d7f77.appspot.com",
  messagingSenderId: "1087653442463",
  appId: "1:1087653442463:web:2bbc3f9a1ec156c88643aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
