import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABfom3pkCnLkE0NOjY62dYJbHZzAbjY3w",
    authDomain: "gadget-rental-4314b.firebaseapp.com",
    projectId: "gadget-rental-4314b",
    storageBucket: "gadget-rental-4314b.appspot.com",
    messagingSenderId: "385517374562",
    appId: "1:385517374562:web:2f6360ae0b7a57df17553b",
    measurementId: "G-SZZXXGP9K5"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  
export { db, auth };