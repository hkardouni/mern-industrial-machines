// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-industrial-machines.firebaseapp.com",
  projectId: "mern-industrial-machines",
  storageBucket: "mern-industrial-machines.appspot.com",
  messagingSenderId: "145880936109",
  appId: "1:145880936109:web:68f7ea8354dd025ce7e024"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);