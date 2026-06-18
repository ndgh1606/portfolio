import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkfFdbcxHma8skOVKhVr1Dn0pWFH0eXss",
  authDomain: "ndgh-portfolio.firebaseapp.com",
  projectId: "ndgh-portfolio",
  storageBucket: "ndgh-portfolio.firebasestorage.app",
  messagingSenderId: "292958555230",
  appId: "1:292958555230:web:3ffd81d36c4b9bffe238cf",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
