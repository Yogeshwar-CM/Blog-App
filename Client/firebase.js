import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKHAInBFW2FxwFA1cOWDKgfLQPHMRylzE",
  authDomain: "blogapp-90676.firebaseapp.com",
  projectId: "blogapp-90676",
  storageBucket: "blogapp-90676.appspot.com",
  messagingSenderId: "1069897211552",
  appId: "1:1069897211552:web:754c0e9d302425a7a233c5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; // Export auth for use in other components
