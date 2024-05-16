import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../constants/colors";
import BackButton from "../util/BackButton";
import { useNavigation } from "@react-navigation/native";

const WeeklyHomework = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack(); // navigate back to the previous screen
  };
  const [homework, setHomework] = useState([
    { name: "sleep 8 hours a day", completed: false },
    { name: "watch a movie", completed: false },
    { name: "make a new friend", completed: false },
  ]);

  function toggleHomework(index) {
    const updatedHomework = [...homework];
    updatedHomework[index] = {
      ...updatedHomework[index],
      completed: !updatedHomework[index].completed,
    };
    setHomework(updatedHomework);
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={handleBackPress} />
      </View>
      <Text style={styles.title}>Weekly Homework</Text>
      <View style={styles.moodhomework}>
        {homework.map((item, index) => (
          <View key={index} style={styles.check}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                item.completed && styles.checkedCheckbox,
              ]}
              onPress={() => toggleHomework(index)}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.homeworkname}>{item.name}</Text>
          </View>
        ))}
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
    backgroundColor: COLORS.cream,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.purple,
    paddingBottom: 20,
  },
  moodhomework: {
    alignSelf: "flex-start",
    marginLeft: 50,
  },
  check: {
    flexDirection: "row",
    marginVertical: 7,
    alignItems: "center",
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: COLORS.lightgreen,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: COLORS.lightgreen,
  },
  checkmark: {
    color: COLORS.white,
  },
  homeworkname: {
    fontSize: 20,
    textTransform: "capitalize",
    color: COLORS.purple,
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
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

export default WeeklyHomework;
