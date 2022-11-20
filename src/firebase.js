import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDO2C_GC353TVT4Y7d7pgpEfXTdKTtR3OY",
  authDomain: "to-do-app-d49ed.firebaseapp.com",
  projectId: "to-do-app-d49ed",
  storageBucket: "to-do-app-d49ed.appspot.com",
  messagingSenderId: "75757665746",
  appId: "1:75757665746:web:39326d3236a92059abdc0b",
  measurementId: "G-2DDQMM8QVL",
  databaseURL: "https://to-do-app-d49ed-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;


