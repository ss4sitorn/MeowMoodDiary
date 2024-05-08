import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDpmtk3cnyO_Z1zh1sv3tkn0ZYnZsBU-jY",
    authDomain: "meowmood-41dee.firebaseapp.com",
    projectId: "meowmood-41dee",
    storageBucket: "meowmood-41dee.appspot.com",
    messagingSenderId: "612007803782",
    appId: "1:612007803782:web:eb994a4eab3d3193154a07",
    measurementId: "G-8N9TW320WW"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  export default firebaseApp;
