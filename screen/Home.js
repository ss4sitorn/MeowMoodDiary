import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import BottomBar from "../util/BottomBar";
import { COLORS } from "../constants/colors";
import { getAuth, getFirestore, doc, getDoc, collection, getDocs, where, query } from "firebase/firestore";
import firebaseApp from "../src/firebase/config";
import { imageMoodStore } from "../util/image-store";

const Home = ({ navigation }) => {
  const db = getFirestore(firebaseApp);
  const [diaryData, setDiaryData] = useState(null);
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function getdiary() {
    const user = getAuth(firebaseApp).currentUser;
    const docRef = doc(db, "diaries", user.uid + currentDate);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDiaryData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const [diary, setDiary] = useState(null);
  async function getAlldiary() {
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
        moodImage: diary.moodImage,
        text: diary.text,
        mood: diary.mood,
        date: diary.date,
      };
      return acc;
    }, {});
    setDiary(diaryData);
  }

  useEffect(() => {
    getdiary();
    getAlldiary();
    const unsubscribe = navigation.addListener("focus", () => {
      getdiary();
      getAlldiary();
    });
    return unsubscribe;
  }, [navigation]);

  const handleStressAssessment = () => {
    navigation.navigate("Assessment");
  };

  const handleDatePress = (date) => {
    setDiaryData(diary[date]);
  };

  const renderDay = ({ date }) => {
    const day = new Date(date.timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const image = diary && imageMoodStore[diary[day]?.mood];
    return (
      <TouchableOpacity onPress={() => handleDatePress(day)}>
        <View style={styles.dayContainer}>
          <Text style={styles.dayNumber}>{date.day}</Text>
          <Image source={image} style={styles.calendarImage} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Calendar</Text>
          </View>
          <Calendar 
            dayComponent={renderDay} 
            onMonthChange={(month) => {
              console.log('Month changed', month);
              setDiary(null);
              getAlldiary();
            }}
          />
          <View style={styles.messageBox}>
            <Image source={imageMoodStore[diaryData?.mood]} style={styles.emoji} />
            <Text style={styles.date}>{diaryData?.date}</Text>
            <Text style={styles.message}>{diaryData?.text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WeeklyHomework")}>
              <Text style={styles.buttonText}>Weekly Homework</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleStressAssessment}>
              <Text style={styles.buttonText}>Stress Assessment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomBar navigation={navigation} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    paddingTop: StatusBar.currentHeight,
  },
  contentContainer: {
    flex: 1, // Take remaining space
    backgroundColor: COLORS.cream,
    paddingHorizontal: 20,
    paddingBottom: 80,
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
  dayContainer: {
    alignItems: "center", // Center items vertically
  },
  dayNumber: {
    marginBottom: 5, // Add some space between the number and the image
  },
  calendarImage: {
    width: 40,
    height: 40,
  },
});

export default Home;
