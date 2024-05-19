import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth =initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Set persistence
export default firebaseApp;
export { auth };