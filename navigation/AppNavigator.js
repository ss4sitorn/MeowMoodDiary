import React from "react";
import { StyleSheet, Text, View } from "react-native-web";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Welcome from "../screen/Welcome";
import Register from '../screen/Register';
import Login from '../screen/Login';
import Pin from '../screen/Pin';
import Home from '../screen/Home';
import MoodCheck from '../screen/MoodCheck';
import ReasonTracker from '../screen/ReasonTracker';
import ForgotPassword from '../screen/ForgotPassword';
import Assessment from "../screen/Assessment";
import CaptureThisDay from "../screen/CaptureThisDay";
import WeekReport from "../screen/WeekReport";
import CardCreate from '../screen/CardCreate';
import CardToday from "../screen/CardToday";
import Setting from "../screen/Setting";
import CardMood from "../screen/CardMood";
import ResetPin from "../screen/ResetPin";
import ConfirmPin from "../screen/ConfirmPin";
import Dashboard from "../screen/Dashboard";
import FavoriteCard from "../screen/FavoriteCard";
import WeeklyHomework from "../screen/WeeklyHomework";
import PinActivate from "../screen/Pin-activate";
import EditProfile from "../screen/EditProfile";

const Stack = createNativeStackNavigator();
const AppNavigator = ({setPage}) => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={setPage}>
                <Stack.Screen name="Welcome" component={ Welcome } options={{headerShown:false}} />
                <Stack.Screen name="Register" component={ Register } />
                <Stack.Screen name="Pin" component={ Pin } />
                <Stack.Screen name="Login" component={ Login } />
                <Stack.Screen name="Home" component={ Home } options={{ headerShown: false }}/>
                <Stack.Screen name="MoodTracker" component={ MoodCheck } options={{headerShown:false}}   />
                <Stack.Screen name="Reason" component={ ReasonTracker } options={{headerShown:false}} />
                <Stack.Screen name="ForgotPassword" component= { ForgotPassword } />
                <Stack.Screen name="Assessment" component={ Assessment } options={{headerShown:false}} />
                <Stack.Screen name="CaptureThisDay" component={ CaptureThisDay } options={{headerShown:false}} />
                <Stack.Screen name="WeekReport" component={ WeekReport } options={{headerShown:false}} />
                <Stack.Screen name="CardCreate" component={ CardCreate } options={{headerShown:false}} />
                <Stack.Screen name="CardToday" component={ CardToday } options={{headerShown:false}} />
                <Stack.Screen name="Setting" component={ Setting } options={{headerShown:false}} />
                <Stack.Screen name="CardMood" component={ CardMood } options={{headerShown:false}} />
                <Stack.Screen name="ResetPin" component={ ResetPin } options={{headerShown:false}} />
                <Stack.Screen name="ConfirmPin" component={ ConfirmPin } options={{headerShown:false}} />
                <Stack.Screen name="Dashboard" component={ Dashboard } options={{headerShown:false}} />
                <Stack.Screen name="FavoriteCard" component={ FavoriteCard } options={{headerShown:false}} />
                <Stack.Screen name="WeeklyHomework" component={ WeeklyHomework } options={{headerShown:false}} />
                <Stack.Screen name="PinActivate" component={ PinActivate } options={{headerShown:false}} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
const styles = StyleSheet.create({});
