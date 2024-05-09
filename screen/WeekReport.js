import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/colors";

const WeekReport = () => {
  const handleBackPress = () => {
    navigation.goBack(); // navigate back to the previous screen
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Week Report</Text>
      </View>
      <View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <View>
        <Text style={styles.stresslevel}>Your stress levels are low</Text>
      </View>
      <View style={styles.report}>
        <Text style={styles.report}>
          {`You had a mixed bag of Mood this week,\n3 days of feeling disapointed,\n3 days of feeling happy,\n 1 days of feeling proud,\nIt was still a good week for you!\nLooking forward to seeing you again next week!`}
        </Text>
      </View>
      <View>
        <Image
          source={require("../assets/Emotion/e00.png")}
          style={styles.image}
          resizeMode="contain"
        />
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
    backgroundColor: "cream",
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  titleText: {
    fontSize: 30,
    color: COLORS.purple,
    fontWeight: "bold",
  },
  date: {
    paddingTop: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  stresslevel: {
    paddingTop: 15,
    fontSize: 16,
    color: COLORS.pink,
    fontSize: 20,
  },
  report: {
    paddingTop: 15,
    fontSize: 20,
    color: COLORS.black,
    textAlign: "center",
    fontWeight: "lighter",
  },
  image: {
    padding: 50,
    width: 500,
    height: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84, 
  },
});

export default WeekReport;
