import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Signup, Welcome } from "./screen";
import AppNavigator from './navigation/AppNavigator';

const Stack = createNativeStackNavigator();
import firebaseApp from './src/firebase/config';
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

getDocs(collection(db, "test"))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    })
    .catch((error) => {
      console.error("Error connecting to Firebase: ", error);
    });
export default function App() {
  return (
   <AppNavigator />
  )
}
