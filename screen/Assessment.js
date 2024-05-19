import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import { set } from "firebase/database";

const questions = [
  "1. Do you have sleep problems, such as insomnia or hypersomnia?",
  "2. Do you have trouble concentrating or focusing?",
  "3. Do you feel irritable, agitated, or restless?",
  "4. Do you feel bored or apathetic?",
  "5. Do you avoid social interaction or withdraw from social activities?",
];

const Assessment = ({route}) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const  mood  = route.params?.mood;
  const [score, setScore] = useState(0);
  const [scoreSum , setScoreSum] = useState(0);
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessage("");
    }
  };

  const handleButtonPress = () => {
    setScoreSum(scoreSum + score);
    console.log(scoreSum);
    if (currentQuestionIndex < questions.length - 1) {
      handleNextQuestion();
    } else {
      navigation.navigate("Reason" , {mood: mood , score: scoreSum});
    }
  };

  const handlePress = (number) => {
    let newMessage;
    switch (number) {
      case 0:
        newMessage = "very little or none at all";
        break;
      case 1:
        newMessage = "sometimes";
        break;
      case 2:
        newMessage = "often";
        break;
      case 3:
        newMessage = "regularly";
        break;
      default:
        newMessage = "Invalid selection";
    }
    setScore(number);
    setMessage(newMessage);
  };

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>May I ask?</Text>
      </View>
      <View>
        <Text style={styles.question}>{questions[currentQuestionIndex]}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        {[0, 1, 2, 3].map((number) => (
          <TouchableOpacity
            key={number}
            style={styles.button}
            onPress={() => handlePress(number)}
          >
            <Text style={styles.buttonText}>{number}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.nextButtonContainer}>
        <View style={styles.nextbutton}>
          <Button
            title={
              currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"
            }
            onPress={handleButtonPress}
            color={COLORS.pink}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "20%",
    backgroundColor: COLORS.cream,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: "10%",
    color: COLORS.darkgreen,
  },
  question: {
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 4,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.purple,
  },
  buttonText: {
    fontSize: 20,
    color: "#333",
  },
  message: {
    fontSize: 15,
    color: COLORS.purple,
    fontWeight: "bold",
    paddingTop: "5%",
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  nextbutton: {
    borderRadius: 25, // adjust this value as needed
    overflow: "hidden",
  },
  nextButtonContainer: {
    marginTop: 50,
  },
});

export default Assessment;
