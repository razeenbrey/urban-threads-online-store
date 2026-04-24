// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const getRequiredEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required Firebase environment variable: ${key}`);
  }
  return value;
};

const getFirstAvailableEnv = (keys) => {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
  }
  throw new Error(
    `Missing required Firebase environment variable. Set one of: ${keys.join(", ")}`
  );
};

const firebaseConfig = {
  apiKey: getRequiredEnv("REACT_APP_FIREBASE_API_KEY"),
  authDomain: getRequiredEnv("REACT_APP_FIREBASE_AUTH_DOMAIN"),
  projectId: getRequiredEnv("REACT_APP_FIREBASE_PROJECT_ID"),
  storageBucket: getRequiredEnv("REACT_APP_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getFirstAvailableEnv([
    "REACT_APP_FIREBASE_SENDER_ID",
    "REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
  ]),
  appId: getRequiredEnv("REACT_APP_FIREBASE_APP_ID"),
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);