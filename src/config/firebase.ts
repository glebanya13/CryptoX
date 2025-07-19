import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3c40_BsXgTC66p-6YutaVs6_-mmfz6d8",
  authDomain: "exchange-d142b.firebaseapp.com",
  databaseURL: "https://exchange-d142b-default-rtdb.firebaseio.com",
  projectId: "exchange-d142b",
  storageBucket: "exchange-d142b.firebasestorage.app",
  messagingSenderId: "850711347653",
  appId: "1:850711347653:web:1787dd32673616ccfa0bac",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
