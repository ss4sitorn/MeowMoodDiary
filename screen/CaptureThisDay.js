import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput ,StatusBar} from "react-native";
import React, {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {firebaseApp} from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import {imageMoodStore, imageReasonStore} from "../util/image-store";
import BackButton from "../util/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";

const CaptureThisDay = ({route}) => {
  const navigation = useNavigation();
  const db = getFirestore(firebaseApp);
  const [textDiary, setTextDiary] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
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

  const diaryData = route.params?.diaryData;


const mood = route.params?.mood || diaryData?.mood ;
const reason = route.params?.reason || diaryData?.reason;
const textDiaries = diaryData?.text;
const score = route.params?.score;

useEffect(() => {
  setTextDiary(textDiaries);
}, []);


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

  async function updateDiary() {
  // update the diary to the database
  // get the current user
  const user = getAuth(firebaseApp).currentUser;
  // save the diary to the databa
  try {
      const diaryRef = doc(db, "diaries", diaryData.id);
      var docData = {
        mood: mood.moodText || mood,
        reason: reason.reasonText || reason,
        text: textDiary,
        uid: user.uid,
        date: diaryData.date,
        score: score || 0,
      };
      if(docData.score == 0){
        delete docData.score;
      }
      await updateDoc(diaryRef, docData);
      showAlert("Success", "Diary updated successfully");
      // navigate to the next screen
      navigation.navigate("Home"); // replace 'AnotherScreen' with the name of the screen you want to navigate to
  } catch (e) {
      console.error(e);
  }
}




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={handleBackPress} />
      </View>
      </View>

      <View style={styles.title}>
        <Text style={styles.titleText}>Capture This Day</Text>
      </View>
      <View>
        <Text style={styles.date}>{diaryData? diaryData.date : currentDate}</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={!diaryData?selectMood : null}>
          <Image
            source={imageMoodStore[mood.moodText || mood]}
            style={styles.image}
          />
          <Text style={styles.imageText}>{mood.moodText || mood}</Text>
        </TouchableOpacity>
      {!diaryData?  <TouchableOpacity style={styles.editIconContainer} onPress={selectMood}>
          <Icon name="pencil" size={25} color="white" />
        </TouchableOpacity> : null }
      </View>
      <View>
        <Text style={styles.reasonText}>Reason</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={null}>
          <Image
            source={imageReasonStore[reason.reasonText || reason]}
            style={styles.image}
          />
          <Text style={styles.imageText}>{reason.reasonText || reason}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Write your Diary here..." value={textDiary}
        onChangeText={text => setTextDiary(text)}
      />
      <TouchableOpacity style={styles.submit} onPress={diaryData? updateDiary : saveDiary}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.cream,
  },
  backButtonContainer: {
    position: "absolute",
    left: 10,
    top: 20,
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
    header: {
      flexDirection: "row",
      justifyContent: "flex-start",
      width: "100%",
      paddingTop: 20,


    },
});

export default CaptureThisDay;
