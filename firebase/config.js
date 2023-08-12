import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { enableLogging } from 'firebase/database';

enableLogging(true);


const firebaseConfig = {
  apiKey: "AIzaSyDukKjkjfh5z6Hx_6q8KHIC_UrSXOOtNu0",
  authDomain: "awesomeproject-e29ba.firebaseapp.com",
  projectId: "awesomeproject-e29ba",
  storageBucket: "awesomeproject-e29ba.appspot.com",
  messagingSenderId: "991236874005",
  appId: "1:991236874005:web:8e699c6e9af72d95e6131c",
  measurementId: "G-PZ0FJ21TD3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const myStorage = getStorage(app);
export const db = getFirestore(app);