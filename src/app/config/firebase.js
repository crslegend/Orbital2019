import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

// Initialise Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAEaaALS4-M0WKCSy2yFY0ZjCUIoJteYyo",
  authDomain: "helpden-ba041.firebaseapp.com",
  databaseURL: "https://helpden-ba041.firebaseio.com",
  projectId: "helpden-ba041",
  storageBucket: "",
  messagingSenderId: "310292320562",
  appId: "1:310292320562:web:20241ac3c8af09c5"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
