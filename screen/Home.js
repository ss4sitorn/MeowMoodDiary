import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Calendar } from "react-native-calendars";
import BottomBar from "../util/BottomBar";
import { COLORS } from "../constants/colors";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import { getFirestore, doc, getDoc ,collection ,getDocs ,where ,query} from "firebase/firestore";
import calendarImage1 from "../assets/Emotion/e01.png";
import calendarImage2 from "../assets/Emotion/e02.png";
import { set } from 'firebase/database';

const Home = ({ navigation }) => {
  const emotionPath = "../assets/Emotion/e01.png";
  const date = "2022-01-01";
  const message = "This is a message from Firebase";
  const db = getFirestore(firebaseApp);
  const [diaryData, setDiaryData] = useState(null);
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  async function getdiary() {
    //get current user
    const user = getAuth(firebaseApp).currentUser;
    const docRef = doc(db, "diaries", user.uid+currentDate);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setDiaryData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  const [diary, setDiary] = useState(null);
  async function getAlldiary() {
    //get all diary of current user uid = field uid in diary collection
    const user = getAuth(firebaseApp).currentUser;
    const diaryRef = collection(db, "diaries");
    const q = query(diaryRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    //map all diary to diaryData
    let diaryData = [];
    querySnapshot.forEach((doc) => {
      diaryData.push(doc.data());
    });
    diaryData = diaryData.reduce((acc, diary) => {
      acc[diary.date] = { moodImage: diary.moodImage, text: diary.text, date: diary.date };
      return acc;
    }, {});
   
    
    console.log(diaryData);
    setDiary(diaryData);
    

    

  }

  
  useEffect(() => {
    getdiary();
    getAlldiary();
    const unsubscribe = navigation.addListener('focus', () => {
      getdiary();
      getAlldiary();
    });
    return unsubscribe;
  }, [navigation]);
  const handleStressAssessment = () => {
    navigation.navigate("Assessment");
  };

  const handleDatePress = (date) => {
    // Logic to show diary for the selected date
    console.log("Selected date:", date);
    setDiaryData(diary[date]);
    // You can navigate to a new screen or show a modal with the diary details
  };

  const renderDay = ({ date }) => {
    // //convert date form 2024-05-15 to 15 May 2024
    const day = new Date(date.timestamp).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    // Get the image for the selected date
    const image = diary && diary[day]?.moodImage;
  
    return (
      <TouchableOpacity onPress={() => handleDatePress(day)}>
      <View style={{ position: 'relative' }}>
        <Image source={image} style={[styles.calendarImage, { zIndex: 0, width: 50, height: 50 }]} />
        <Text style={{ position: 'absolute', zIndex: 1, alignSelf: 'center', top: '50%', transform: [{ translateY: -8 }] }}>{date.day}</Text>
      </View>
      </TouchableOpacity>
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
          <Image source={diaryData?.moodImage} style={styles.emoji} />
          <Text style={styles.date}>{diaryData?.date}</Text>
          <Text style={styles.message}>{diaryData?.text}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WeeklyHomework')}>
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
    backgroundColor: COLORS.cream,
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