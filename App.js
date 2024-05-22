import React, {useEffect , useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './navigation/AppNavigator';
import {getAuth} from "firebase/auth";
import firebaseApp from "./src/firebase/config";
import {ActivityIndicator, View} from "react-native";
import {Login} from "./screen";
import {getUserData} from "./util/firebase-help";

const auth = getAuth(firebaseApp);
const Stack = createNativeStackNavigator();



    const App = () => {
        const [initializing, setInitializing] = useState(true);
        const [user, setUser] = useState(null);
        const [pinActive , setPinActive] = useState(false)

        // Handle user state changes
        async function onAuthStateChanged(user) {
            setUser(user)
            if(user)
            if(await getUserData("pin")){
                console.log("pin exist")
                setPinActive(true);
            }
            if (initializing) setInitializing(false);
        }

        useEffect(() => {
            return auth.onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
        }, []);

        if (initializing) return <ActivityIndicator size="large" />;

        return (
            <View style={{ flex: 1 }}>
                {user ? <AppNavigator setPage={pinActive ? "PinActivate" :"Home"}/> :  <AppNavigator setPage={"Welcome"}/>}
            </View>
        );
    };

    export default App;
