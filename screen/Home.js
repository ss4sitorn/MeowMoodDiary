import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import React from "react";
import BottomBar from "../util/BottomBar";
import { COLORS } from "../constants/colors";

import calendarImage1 from "../assets/Emotion/e01.png";
import calendarImage2 from "../assets/Emotion/e02.png";

const Home = ({ navigation }) => {
  const emotionPath = "../assets/Emotion/e01.png";
  const date = "2022-01-01";
  const message = "This is a message from Firebase";

  const handleStressAssessment = () => {
    navigation.navigate("Assessment");
  };

  const images = {
    "2024-05-11": calendarImage1,
    "2024-05-15": calendarImage2,
  };

  //ฟังค์สำหรับแปะภาพลงในวันที่
  const renderDay = ({ date, state }) => {
    const image = images[date.dateString];
  
    return (
      <View>
        <Text>{date.day}</Text>
        {image && <Image source={image} style={styles.calendarImage} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Calendar</Text>
        </View>
        <Calendar dayComponent={renderDay} />
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
      <BottomBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "cream",
  },
  contentContainer: {
    flex: 1, // Take remaining space
    backgroundColor: COLORS.cream,
    padding: 20,
  },
  titleContainer: {
    alignSelf: "flex-start",
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.darkgreen,
    marginBottom: 20,
    marginLeft: 5,

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.purple,
    width: "45%", // เปลี่ยนเป็น 45%
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonText: {
    color: COLORS.purple,
    fontSize: 16,
  },
  messageBox: {
    backgroundColor: COLORS.white,
    borderRadius: 10, // Rounded corners
    padding: 20,
    alignItems: "center", // Center everything
    justifyContent: "center", // Center everything
    marginTop: 20, // Add some margin at the top
    borderBlockColor: COLORS.purple,
    borderWidth: 1,
    shadowColor: "#000",
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
  calendarImage: {
    width: 40,
    height: 40,
  },
});

export default Home;


