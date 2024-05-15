import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import BackButton from "../util/BackButton";
import Mood from "../util/Mood";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const CardMood = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedMood, setSelectedMood] = useState("");

  const handleMoodTag = (mood) => {
    setSelectedMood(mood);
  };

  const handleCardCreate = async () => {
    if (!selectedMood) {
      Alert.alert("Error", "Please select a mood before creating the card.");
      return;
    }

    try {
      const db = getFirestore();
      const cardCollection = collection(db, "card");
      const { bgColor, icon, quote, signature } = route.params;

      await addDoc(cardCollection, {
        bgColor,
        icon,
        mood: selectedMood,
        quote,
        signature,
      });

      Alert.alert("Success", "Card created successfully!");
      navigation.navigate("Home"); // Navigate to Home screen or any other screen
    } catch (error) {
      console.error("Error creating card:", error);
      Alert.alert("Error", "There was an error creating the card. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.header}>Add Mood to Your Card</Text>
      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <Mood imageSource={require("../assets/Emotion/e01.png")} moodText="Disappointed" onPress={() => handleMoodTag("Disappointed")} />
          <Mood imageSource={require("../assets/Emotion/e02.png")} moodText="Shy" onPress={() => handleMoodTag("Shy")} />
          <Mood imageSource={require("../assets/Emotion/e03.png")} moodText="Confused" onPress={() => handleMoodTag("Confused")} />
        </View>
        <View style={styles.row}>
          <Mood imageSource={require("../assets/Emotion/e12.png")} moodText="Happy" onPress={() => handleMoodTag("Happy")} />
          <Mood imageSource={require("../assets/Emotion/e04.png")} moodText="Sad" onPress={() => handleMoodTag("Sad")} />
          <Mood imageSource={require("../assets/Emotion/e06.png")} moodText="Silly" onPress={() => handleMoodTag("Silly")} />
        </View>
        <View style={styles.row}>
          <Mood imageSource={require("../assets/Emotion/e07.png")} moodText="Angry" onPress={() => handleMoodTag("Angry")} />
          <Mood imageSource={require("../assets/Emotion/e13.png")} moodText="Sleepy" onPress={() => handleMoodTag("Sleepy")} />
          <Mood imageSource={require("../assets/Emotion/e08.png")} moodText="Jealous" onPress={() => handleMoodTag("Jealous")} />
        </View>
        <View style={styles.row}>
          <Mood imageSource={require("../assets/Emotion/e09.png")} moodText="Love" onPress={() => handleMoodTag("Love")} />
          <Mood imageSource={require("../assets/Emotion/e10.png")} moodText="Proud" onPress={() => handleMoodTag("Proud")} />
          <Mood imageSource={require("../assets/Emotion/e14.png")} moodText="Bored" onPress={() => handleMoodTag("Bored")} />
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