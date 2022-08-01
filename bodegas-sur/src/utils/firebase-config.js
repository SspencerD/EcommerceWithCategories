// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAWJephtBVPzM-xOchAyIkLuctB1O9aaMM",
  authDomain: "escalab-course.firebaseapp.com",
  projectId: "escalab-course",
  storageBucket: "escalab-course.appspot.com",
  messagingSenderId: "114366654597",
  appId: "1:114366654597:web:82931b610aaa4d7007e1ec",
  measurementId: "G-MV1Z33J95S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
