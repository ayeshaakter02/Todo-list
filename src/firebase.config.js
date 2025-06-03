// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB-Uca-xQcbouUsvABQmglnZ9R-rQl6gig",
  authDomain: "crud-d7be7.firebaseapp.com",
  databaseURL: "https://crud-d7be7-default-rtdb.firebaseio.com",
  projectId: "crud-d7be7",
  storageBucket: "crud-d7be7.firebasestorage.app",
  messagingSenderId: "1016594179465",
  appId: "1:1016594179465:web:43bcd332d25ab3bbb3ad58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig