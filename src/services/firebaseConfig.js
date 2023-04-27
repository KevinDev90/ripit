// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import Constants from "expo-constants";

const config = Constants.expoConfig.extra;
// TODO Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.API_KEY_FIREBASE,
  authDomain: config.DOMAIN_FIREBASE,
  databaseURL: config.URL_DATABASE,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_FIREBASE,
  messagingSenderId: config.SENDER_FIREBASE,
  appId: config.APP_ID_FIREBASE,
  measurementId: config.MEASUREMENT_FIREBASE,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
