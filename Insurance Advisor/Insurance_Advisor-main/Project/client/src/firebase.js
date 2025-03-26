// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGswYtiXhWDhPdNVIvQgnMoc7U1i85V0Q",
  authDomain: "insurance-advisor-b6a97.firebaseapp.com",
  projectId: "insurance-advisor-b6a97",
  storageBucket: "insurance-advisor-b6a97.appspot.com",
  messagingSenderId: "450384298641",
  appId: "1:450384298641:web:d7a5d7d012160a4dd13530",
  measurementId: "G-62KL23TZST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };