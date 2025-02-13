// Importer nødvendige Firebase-funksjoner
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";//

// Firebase-konfigurasjon
const firebaseConfig = {
  apiKey: "AIzaSyAw9_KBK_AVNQLSjeBb13u-1QGrXvfQzuw",
  authDomain: "bil-pris-sjekker.firebaseapp.com",
  projectId: "bil-pris-sjekker",
  storageBucket: "bil-pris-sjekker.appspot.com",
  messagingSenderId: "186577960272",
  appId: "1:186577960272:web:f637bfaa5e61a7ff098055",
  measurementId: "G-2NQ3R1JQ5G",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Firestore Database
//const analytics = getAnalytics(app);//

// Eksporter Firestore-databasen slik at vi kan bruke den i andre filer
export { db, };