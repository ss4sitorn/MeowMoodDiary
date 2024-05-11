import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import CardCreate from "./CardCreate";
import BackButton from "../util/BackButton";
import Mood from "../util/Mood";



const CardMood = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate("CardCreate");
      };

        const handleMoodTag = () => {
      };

      const handleCardCreate = () => {
    };

    return (
        // JSX code
        <View style={styles.container} >
            <View style={styles.back}>
                <BackButton onPress={handleBackPress} />
            </View>
           
            <Text style={styles.header} >Add Mood to Your Card</Text>
            <View style={styles.tableContainer}>
                <View style={styles.row}>
                    <Mood imageSource={require("../assets/Emotion/e01.png")} moodText="Disappointed" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e02.png")} moodText="Shy" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e03.png")} moodText="Confused" onPress={handleMoodTag} />
                </View>
                <View style={styles.row}>
                    <Mood imageSource={require("../assets/Emotion/e12.png")} moodText="Happy" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e04.png")} moodText="Sad" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e06.png")} moodText="Silly" onPress={handleMoodTag} />

                </View>
                <View style={styles.row}>
                    <Mood imageSource={require("../assets/Emotion/e07.png")} moodText="Angry" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e13.png")} moodText="Sleepy" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e08.png")} moodText="Jealous" onPress={handleMoodTag} />
     
                </View>
                <View style={styles.row}>
                    <Mood imageSource={require("../assets/Emotion/e09.png")} moodText="Love" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e10.png")} moodText="Proud" onPress={handleMoodTag} />
                    <Mood imageSource={require("../assets/Emotion/e14.png")} moodText="Bored" onPress={handleMoodTag} />
                </View>
            </View> 
            <TouchableOpacity style={styles.button} onPress={handleCardCreate}>
            <Text style={styles.buttonText}>Create Card</Text>
          </TouchableOpacity>
        </View>
    );  
    
   


 };


 const styles = StyleSheet.create({
    container: {
         flex: 1,
         justifyContent: "flex-start",
        alighItems: "center",        
         paddingTop: "20%",
         backgroundColor: COLORS.cream,
      },
    header: {
        fontSize:   30, 
        fontWeight: "bold",
        color: COLORS.darkgreen,
        textAlign: "center",

    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },

    back : {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 1,
      },
    button: {
        backgroundColor: COLORS.pink,
        padding: 10,
        marginTop: 70, // Adjusted margin top
        borderRadius: 5,
        width: "30%", // Adjusted width
        height: 45,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        marginHorizontal: "2%", // Adjusted margin
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "bold",
    },
    tableContainer: {
        marginTop: 20, 
    },

 });

export default CardMood;