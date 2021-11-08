import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNhhMOPfaqtd2MPH7jln-ObOXRwMhCpuk",
  authDomain: "dashboard-3525f.firebaseapp.com",
  projectId: "dashboard-3525f",
  storageBucket: "dashboard-3525f.appspot.com",
  messagingSenderId: "311415369670",
  appId: "1:311415369670:web:1f00e4c04433a4cee04cc7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

export default app;