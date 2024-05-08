import React from "react";
import { StyleSheet, Text, View } from "react-native-web";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Welcome from "../screen/Welcome";
import Register from '../screen/Register';
import Login from '../screen/Login';
import Pin from '../screen/Pin';


const Stack = createNativeStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={ Welcome } options={{headerShown:false}} />
                <Stack.Screen name="Register" component={ Register } />
                <Stack.Screen name="Pin" component={ Pin } />
                <Stack.Screen name="Login" component={ Login } />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
const styles = StyleSheet.create({});
