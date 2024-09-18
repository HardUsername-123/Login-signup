// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNR8wf1PgDcRSdJMmE8RyD2npyqZD33gI",
  authDomain: "react-project-bb673.firebaseapp.com",
  projectId: "react-project-bb673",
  storageBucket: "react-project-bb673.appspot.com",
  messagingSenderId: "513277797332",
  appId: "1:513277797332:web:d61e09f36c06142b32ec41",
  measurementId: "G-95EWJ0N09C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };
