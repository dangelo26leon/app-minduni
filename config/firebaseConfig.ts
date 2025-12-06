import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH9lTmwStRRBTK_KR6l4XWqCtFCJnzL0I",
  authDomain: "minduni-e1181.firebaseapp.com",
  projectId: "minduni-e1181",
  storageBucket: "minduni-e1181.firebasestorage.app",
  messagingSenderId: "215839504060",
  appId: "1:215839504060:web:4550871b04d8a7f8a782b9",
  measurementId: "G-PBFL2Y64LF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
