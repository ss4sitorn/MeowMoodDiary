import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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

// Initialize Firebase App if it hasn't been initialized yet
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth with AsyncStorage
const auth =initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(firebaseApp);

// Initialize Firebase Storage
const storage = getStorage(firebaseApp);

// Export Firebase App, Auth, Firestore, and Storage
export { firebaseApp, auth, db, storage };
