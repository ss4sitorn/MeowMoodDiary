import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../util/BackButton";
import { getFirestore, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseApp from "../src/firebase/config";
import { COLORS } from "../constants/colors";

// ฟังก์ชันสำหรับคำนวณค่าเฉลี่ยของคะแนนความเครียด
const calculateAverage = (data) => {
  if (data.length === 0) return 0;
  const sum = data.reduce((acc, curr) => acc + curr, 0);
  return sum / data.length;
};

// ฟังก์ชันสำหรับแปลงค่าเฉลี่ยความเครียดเป็นข้อความ
const averageStressText = (average) => {
  let stressLevel = "low";
  if (average >= 5 && average < 10) stressLevel = "moderate";
  else if (average >= 10 && average < 15) stressLevel = "very";
  else if (average >= 15) stressLevel = "most";

  return `Your weekly stress average is ${stressLevel}`;
};

const WeekReport = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack(); // navigate back to the previous screen
  };

  const [moodSummary, setMoodSummary] = useState({});
  const [averageStress, setAverageStress] = useState(0);

  useEffect(() => {
    const fetchMoodData = async () => {
      const db = getFirestore(firebaseApp);
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;

      if (!user) {
        console.log("User is not logged in");
        return;
      }

      const uid = user.uid;
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const formatDateString = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // เดือนใน JS เริ่มจาก 0
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      };

      const todayString = formatDateString(today);
      const sevenDaysAgoString = formatDateString(sevenDaysAgo);

      const diariesRef = collection(db, "diaries");
      const q = query(
        diariesRef,
        where("date", ">=", sevenDaysAgoString),
        where("date", "<=", todayString),
        where("uid", "==", uid),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(q);
      const summary = {};
      const stressScores = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const mood = data.mood;
        const score = data.score || 0;

        if (summary[mood] !== undefined) {
          summary[mood] += 1;
        } else {
          summary[mood] = 1;
        }

        stressScores.push(score);
      });

      const average = calculateAverage(stressScores);
      setMoodSummary(summary);
      setAverageStress(average);
    };

    fetchMoodData();
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const moodEntries = Object.entries(moodSummary).map(([mood, count]) => (
    <Text key={mood} style={styles.reportText}>
      {`${count} days of feeling ${mood}`}
    </Text>
  ));

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={handleBackPress} />
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>Week Report</Text>
      </View>
      <View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <View>
        <Text style={styles.stresslevel}>{averageStressText(averageStress)}</Text>
      </View>
      <View style={styles.reportContainer}>
        <Text style={styles.reportText}>
          {`You had a mixed bag of moods this week:`}
        </Text>
        {moodEntries.length > 0 ? moodEntries : (
          <Text style={styles.reportText}>
            {`No mood entries found for this week.`}
          </Text>
        )}
        <Text style={styles.reportText}>
          {`It was still a good week for you!\nLooking forward to seeing you again next week!`}
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
    backgroundColor: COLORS.cream,
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
    fontSize: 20,
    color: COLORS.pink,
  },
  reportContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  reportText: {
    fontSize: 20,
    color: COLORS.black,
    textAlign: "center",
    fontWeight: "300",
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
