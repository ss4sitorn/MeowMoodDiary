import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
    const handleSignIn = () => {
        // Handle sign-in logic
        console.log("Sign in button pressed");
    };

    const handleLogin = () => {
        // Handle login logic
        console.log("Login button pressed");
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.welcomeText}>Welcome to React Native Web</Text>   
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: width * 0.8, // Adjust width as needed
        height: height * 0.3, // Adjust height as needed
        resizeMode: "contain", // Ensure image fits within the specified dimensions
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "red",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "blue",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});

export default Welcome;
