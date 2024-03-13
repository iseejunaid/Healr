import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaBAXkBb-rsPNdYHXgE-Mq-sAxK24UaYA",
  authDomain: "healr-fyp-8b8c3.firebaseapp.com",
  projectId: "healr-fyp-8b8c3",
  storageBucket: "healr-fyp-8b8c3.appspot.com",
  messagingSenderId: "101731941665",
  appId: "1:101731941665:web:ce3d3f93a10fb78fac5260",
  measurementId: "G-8T5GYCW604"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
