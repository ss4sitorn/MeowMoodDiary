import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import React, {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {imageMoodStore, imageReasonStore} from "../util/image-store";

const CaptureThisDay = ({route}) => {
  const navigation = useNavigation();
  const db = getFirestore(firebaseApp);
  const [textDiary, setTextDiary] = useState('');

  const handleBackPress = () => {
    navigation.navigate("Reason");
  };

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const selectMood = () => {
    //alert("Select mood");
    navigation.navigate("MoodTracker");
  };

  const selectReason = () => {
    //alert("Select Reason");
    navigation.navigate("Reason");
  };

  const handleSubmit = () => {
    // navigate to another screen
    navigation.navigate("Home"); // replace 'AnotherScreen' with the name of the screen you want to navigate to
  };


const mood = route.params?.mood;
const reason = route.params?.reason;
const score = route.params?.score;


function saveDiary() {
  // save the diary to the database
  // get the current user
  const user = getAuth(firebaseApp).currentUser;
  // save the diary to the database
  const diaryRef = doc(db, "diaries",user.uid + currentDate);
  var docData = {
    mood: mood.moodText,
    reason: reason.reasonText,
    text: textDiary,
    uid: user.uid,
    date: currentDate,
    score: score || 0,
  };
  if(docData.score == 0){
    delete docData.score;
  }
  setDoc(diaryRef, docData)
    .then(() => {
      showAlert("Success", "Diary saved successfully");
      // navigate to the next screen
      navigation.navigate("Home"); // replace 'AnotherScreen' with the name of the screen you want to navigate to
    })
    .catch((error) => {
      showAlert("Error", error.message);
    });
}





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
            source={imageMoodStore[mood.moodText]}
            style={styles.image}
          />
          <Text style={styles.imageText}>{mood.moodText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editIconContainer} onPress={selectMood}>
          <Icon name="pencil" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.reasonText}>Reason</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={selectReason}>
          <Image
            source={imageReasonStore[reason.reasonText]}
            style={styles.image}
          />
          <Text style={styles.imageText}>{reason.reasonText}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Write your Diary here..."
        onChangeText={text => setTextDiary(text)}
      />
      <TouchableOpacity style={styles.submit} onPress={saveDiary}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

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
