import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
    const navigation = useNavigation();

    const handleSignIn = () => {
        // Navigate to SignUp screen
        navigation.navigate("SignUp");
    };

    const handleLogin = () => {
        // Navigate to Login screen
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.welcomeText}> Meow Mood the diary</Text>   
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.buttonSpacer} />
                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: COLORS.brown,
    },
    logo: {
        width: width * 0.8,
        height: height * 0.3,
        resizeMode: "contain",
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.darkgreen,
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    button: {
        backgroundColor: COLORS.lightgreen,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: "40%", // Adjust button width as needed
    },
    buttonSpacer: {
        width: "10%", // Adjust spacing between buttons as needed
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.white,
        textAlign: "center",
    },
});

export default Welcome;

