// /Users/mo/.gemini/antigravity/scratch/riseos-webapp/js/firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, 
         signInWithEmailAndPassword, 
         createUserWithEmailAndPassword, 
         signOut, 
         onAuthStateChanged,
         GoogleAuthProvider,
         signInWithPopup,
         updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMC84ILtx_yM7qfyCaKVZS0hwGdoPIh8I",
  authDomain: "riseos-ce5f0.firebaseapp.com",
  projectId: "riseos-ce5f0",
  storageBucket: "riseos-ce5f0.firebasestorage.app",
  messagingSenderId: "1069243121918",
  appId: "1:1069243121918:web:0f30f6a067bfefdbf0e5af",
  measurementId: "G-5F7FXX25F6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { 
    auth, 
    db, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    doc,
    getDoc,
    setDoc
};
