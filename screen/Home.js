import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import BottomBar from "../util/BottomBar";
import { COLORS } from "../constants/colors";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { imageMoodStore } from "../util/image-store";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = ({ navigation }) => {
  const db = getFirestore(firebaseApp);
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [diaryData, setDiaryData] = useState(null);
  const [diary, setDiary] = useState(null);

  const getDiary = async () => {
    const user = getAuth(firebaseApp).currentUser;
    const docRef = doc(db, "diaries", user.uid + currentDate);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const diary = docSnap.data();
      const diaryData = {
        id: diary.uid + diary.date,
        moodImage: diary.moodImage,
        reason: diary.reason,
        text: diary.text,
        mood: diary.mood,
        date: diary.date,
      };
      setDiaryData(diaryData);
    } else {
      console.log("No such document!");
    }
  };
  const getAllDiary = async () => {
    const user = getAuth(firebaseApp).currentUser;
    const diaryRef = collection(db, "diaries");
    const q = query(diaryRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let diaryData = [];
    querySnapshot.forEach((doc) => {
      diaryData.push(doc.data());
    });
    diaryData = diaryData.reduce((acc, diary) => {
      acc[diary.date] = {
        id: diary.uid + diary.date,
        moodImage: diary.moodImage,
        reason: diary.reason,
        text: diary.text,
        mood: diary.mood,
        date: diary.date,
      };
      return acc;
    }, {});
    setDiary(diaryData);
  };

  useEffect(() => {
    getDiary();
    getAllDiary();
    const unsubscribe = navigation.addListener("focus", () => {
      getDiary();
      getAllDiary();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDatePress = (date) => {
    console.log(diary[date]);
    setDiaryData(diary[date]);
  };

  const deleteFieldWithValue = async (date) => {
    try {
      const user = getAuth(firebaseApp).currentUser;
      const docRef = doc(db, "diaries", user.uid + date);
      await deleteDoc(docRef);
      setDiaryData(null);
      Alert.alert("Success", "Diary entry deleted.");
      getAllDiary();
    } catch (error) {
      console.error("Error deleting diary entry: ", error);
      Alert.alert("Error", "Failed to delete diary entry.");
    }
  };

  const renderDay = ({ date }) => {
    const day = new Date(date.timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const image = diary && diary[day] ? imageMoodStore[diary[day]?.mood] : null;
    return (
      <TouchableOpacity onPress={() => handleDatePress(day)}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayNumber}>{date.day}</Text>
          {image && <Image source={image} style={styles.calendarImage} />}
        </View>
      </TouchableOpacity>
    );
  };

  const handleUpdate = () => {
    navigation.navigate("CaptureThisDay", { diaryData: diaryData });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Calendar</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Calendar
            dayComponent={renderDay}
            onMonthChange={(month) => {
              console.log("Month changed", month);
              setDiary(null);
              getAllDiary();
            }}
          />
          <View style={styles.messageBox}>
            <Image
              source={imageMoodStore[diaryData?.mood]}
              style={styles.emoji}
            />
            <Text style={styles.date}>{diaryData?.date}</Text>
            <Text style={styles.message}>{diaryData?.text}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (diaryData) {
                  deleteFieldWithValue(diaryData?.date);
                }
              }}
            >
              <Text style={styles.buttonText}>Delete Your Mood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("WeeklyHomework")}
            >
              <Text style={styles.buttonText}>Weekly Assignment</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <BottomBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLORS.cream,
    paddingTop: StatusBar.currentHeight,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: StatusBar.currentHeight,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  titleContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingBottom: 10,
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
    width: "45%",
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
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
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
    color: COLORS.black,
  },
  message: {
    fontSize: 16,
    color: COLORS.black,
  },
  dayContainer: {
    alignItems: "center",
  },
  dayNumber: {
    marginBottom: 5,
  },
  calendarImage: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    width: "100%", 
    marginTop: 20,
    alignItems: "center", 
  },
  centeredButton: {
    width: "80%", 
  },
});

export default Home;
