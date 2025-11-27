// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7oA0FIu61jzMmCjzjOKP-sazkzCBfcEY",
  authDomain: "jmc-login-system.firebaseapp.com",
  projectId: "jmc-login-system",
  storageBucket: "jmc-login-system.appspot.com",
  messagingSenderId: "840248483728",
  appId: "1:840248483728:web:97c01dc1b0b26e29765d15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);      // MUST BE HERE
export const db = getFirestore(app);   // MUST BE HERE


