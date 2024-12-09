// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8PgAS4ota-d_m_W5jeqGwiubcCyhKx2Q",
  authDomain: "citywatch-e5192.firebaseapp.com",
  projectId: "citywatch-e5192",
  storageBucket: "citywatch-e5192.firebasestorage.app",
  messagingSenderId: "265166347043",
  appId: "1:265166347043:web:f9e1bd125b872b929bca96",
  measurementId: "G-W89VK9BWR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;