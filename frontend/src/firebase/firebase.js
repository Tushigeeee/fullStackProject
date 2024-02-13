// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm58hcZMMyWDmeL-zN4uS36SlNWcEzy5o",
  authDomain: "fullstack-53263.firebaseapp.com",
  projectId: "fullstack-53263",
  storageBucket: "fullstack-53263.appspot.com",
  messagingSenderId: "654532818460",
  appId: "1:654532818460:web:4d0eb2429c5c087c4b51d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
