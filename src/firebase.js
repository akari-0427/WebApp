import { initializeApp } from "firebase/app";
import{getAuth}from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB2vKq7bH0Cj-g0XZZwCbX4ORIII9z5Ktk",
  authDomain: "web-app-39552.firebaseapp.com",
  projectId: "web-app-39552",
  storageBucket: "web-app-39552.appspot.com",
  messagingSenderId: "591519941446",
  appId: "1:591519941446:web:5ee17223d303af75005b47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const get = getFirestore(app);
export default db;
