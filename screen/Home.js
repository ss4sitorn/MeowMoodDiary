import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import React from "react";

const Home = ({ navigation }) => {
  const emotionPath = "../assets/Emotion/e01.png";
  const date = "2022-01-01";
  const message = "This is a message from Firebase";

  const handleStressAssessment = () => {
    navigation.navigate("Assessment");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Calendar</Text>
      </View>
      <Calendar />
      <View style={styles.messageBox}>
        <Image source={require(emotionPath)} style={styles.emoji} />
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Weekly Homework</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStressAssessment}>
          <Text style={styles.buttonText}>Stress Assessment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "COLORS.cream",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 30,
    color: "COLORS.darkgreen",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  button: {
    backgroundColor: "COLORS.white",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "COLORS.purple",
    width: "45%", // เปลี่ยนเป็น 45%
    alignItems: "center",
    justifyContent: "center", // เพิ่ม
    margin: 10,
    shadowColor: "COLORS.black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonText: {
    color: "COLORS.purple",
    fontSize: 16,
  },
  messageBox: {
    backgroundColor: "COLORS.white",
    borderRadius: 10, // Rounded corners
    padding: 20,
    alignItems: "center", // Center everything
    justifyContent: "center", // Center everything
    marginTop: 20, // Add some margin at the top
    borderBlockColor: "COLORS.purple",
    borderWidth: 1,
    shadowColor: "COLORS.black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  emoji: {
    width: 80,
    height: 80,
  },
  date: {
    fontSize: 20,
    color: "COLORS.black",
  },
  message: {
    fontSize: 16,
    color: "COLORS.black",
  },
});

export default Home;
