import "firebase/auth";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBrH0pfB1xiIA1bwHtRaqO589kxWN-DBio",
  authDomain: "messenger-clone-30902.firebaseapp.com",
  projectId: "messenger-clone-30902",
  storageBucket: "messenger-clone-30902.appspot.com",
  messagingSenderId: "67311321653",
  appId: "1:67311321653:web:d781a090a3d0facdb1e77c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth };
