// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApZpB0SFzh43wNHZJEF-9ZbN3OKomuNF4",
  authDomain: "my-soil-app2.firebaseapp.com",
  databaseURL: "https://my-soil-app2-default-rtdb.firebaseio.com",
  projectId: "my-soil-app2",
  storageBucket: "my-soil-app2.appspot.com",
  messagingSenderId: "648347615709",
  appId: "1:648347615709:web:2656d6a6ca31ad60913634",
  measurementId: "G-3P0S2ZKN5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


 const db = getDatabase(app)
 export {db};