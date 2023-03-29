// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWgZMXYXwAXTpUnm9SN1kVUMebVrkeQyk",
  authDomain: "ripit-e2b69.firebaseapp.com",
  databaseURL: "https://ripit-e2b69-default-rtdb.firebaseio.com",
  projectId: "ripit-e2b69",
  storageBucket: "ripit-e2b69.appspot.com",
  messagingSenderId: "54079679271",
  appId: "1:54079679271:web:88c23a1aee83a7bd5b1702",
  measurementId: "G-LDL32K8FN2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
