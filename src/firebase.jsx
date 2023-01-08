import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhp4E-G2cSoKtAcgyNKHM7DKy4TCXtpw4",
  authDomain: "ringing-1a3b0.firebaseapp.com",
  databaseURL: "https://ringing-1a3b0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ringing-1a3b0",
  storageBucket: "ringing-1a3b0.appspot.com",
  messagingSenderId: "892936004532",
  appId: "1:892936004532:web:649c4ea4475a23893788e1",
  measurementId: "G-8JLN4L4MY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);

