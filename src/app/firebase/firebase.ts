// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to u
import { getFirestore} from 'firebase/firestore/lite';
import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCig-RDFemQkBbvUuNMSYqy-Eo46xP_RSo",
  authDomain: "water-quality-app-1c0ba.firebaseapp.com",
  databaseURL: "https://water-quality-app-1c0ba-default-rtdb.firebaseio.com",
  projectId: "water-quality-app-1c0ba",
  storageBucket: "water-quality-app-1c0ba.appspot.com",
  messagingSenderId: "16551431695",
  appId: "1:16551431695:web:33a4a23bcd89a99796dd7a",
  measurementId: "G-CJ0EDYG3TG"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

 var  db = getDatabase(app);
