import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBaBAXkBb-rsPNdYHXgE-Mq-sAxK24UaYA",
  authDomain: "healr-fyp-8b8c3.firebaseapp.com",
  projectId: "healr-fyp-8b8c3",
  storageBucket: "healr-fyp-8b8c3.appspot.com",
  messagingSenderId: "101731941665",
  appId: "1:101731941665:web:ce3d3f93a10fb78fac5260",
  measurementId: "G-8T5GYCW604"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage};
