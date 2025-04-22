import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCj5yF2Zbf8zpqjAnREzdseLGSPhmMjiRc",
  authDomain: "codexp-dd089.firebaseapp.com",
  projectId: "codexp-dd089",
  storageBucket: "codexp-dd089.firebasestorage.app",
  messagingSenderId: "242610062392",
  appId: "1:242610062392:web:3ce82b684af4eae2cd92cd",
  measurementId: "G-475R35HT10"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export { app, analytics, db };
