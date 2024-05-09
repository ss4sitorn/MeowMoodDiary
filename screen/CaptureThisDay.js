import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';
import BottomBar from "../util/BottomBar";

const CaptureThisDay = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Reason");
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const selectMood = () => {
    alert("Select mood");
  };

  const handleSubmit = () => {
    // navigate to another screen
    navigation.navigate("AnotherScreen"); // replace 'AnotherScreen' with the name of the screen you want to navigate to
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.title}>
        <Text style={styles.titleText}>Capture This Day</Text>
      </View>
      <View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={selectMood}>
          <Image
            source={require("../assets/Emotion/e01.png")}
            style={styles.image}
          />
          <Text style={styles.imageText}>sad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editIconContainer} onPress={selectMood}>
          <Icon name="pencil" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.reasonText}>Reason</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={selectMood}>
          <Image
            source={require("../assets/Stress reason icon/r01.png")}
            style={styles.image}
          />
          <Text style={styles.imageText}>social</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editIconContainer} onPress={selectMood}>
          <Icon name="pencil" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Write your Diary here..."
        
      />
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      
      <BottomBar navigation={navigation} />
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
    color: COLORS.darkgreen,
    fontWeight: "bold",
  },
  submit: {
    marginTop: 20,
    backgroundColor: COLORS.lightgreen,
    alignItems: "center",
    padding: 10,
    width: 80,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    paddingTop: 15,
    fontSize: 16,
    color: COLORS.black,
  },
  imageContainer: {
    position: "relative",
    width: 135,
    height: 135,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.pink,
    borderRadius: 50,
    padding: 5,
  },
  imageText: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    textAlign: "center",
    color: COLORS.pink,
    fontSize: 16,
  },
  reasonText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: COLORS.lightgreen, 
    borderWidth: 2,
    borderRadius: 20, 
    backgroundColor: COLORS.white, 
    marginTop: 40,
    marginBottom: 20,
    paddingLeft: 10,
    },
});

export default CaptureThisDay;
