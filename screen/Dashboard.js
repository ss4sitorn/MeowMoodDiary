import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../constants/colors";
import BottomBar from "../util/BottomBar";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limitToLast,
} from "firebase/firestore";
import firebaseApp from "../src/firebase/config";
import { getDataCollectionWithUid } from "../util/firebase-help";

const Dashboard = ({ navigation }) => {
  const [isWeekly, setIsWeekly] = useState(true);
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [stressData, setStressData] = useState([0, 1, 2, 3, 2, 1, 3]); // เก็บข้อมูล stress score จาก Firebase
  const [label, setLabel] = useState(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]); // เก็บข้อมูล stress score จาก Firebase


  useEffect(() => {
    const fetchStressData = async () => {
      const db = getFirestore(firebaseApp);
      const today = new Date();
      console.log(today);
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // ย้อนหลัง 7 วัน
      console.log(sevenDaysAgo);
      const dataDia = await getDataCollectionWithUid("diaries");


      const data = [];
      let dayArray = [];
      //filer data between today and 7 days ago
      const filteredData = dataDia.filter((doc) => {
        const docDate = doc.date; // assuming there is a 'date' field in the document
        return docDate >= sevenDaysAgo && docDate <= today;
      });
      filteredData.forEach((doc) => {
        data.push(doc.score || 0); // ถ้าไม่มี score ให้เป็น 0
        //get day text of the week
        const day = new Date(doc.date).toLocaleDateString("en-GB", {
          weekday: "short",
        });

        console.log("day: ", day);
        dayArray.push(day);
      });
      let i = 1;
      while (data.length < 7) {
        data.push(0); // เติม 0 ให้ครบ 7 วัน
        //add day text next ต่อจากวันสุดท้าย
        const lastDay = new Date(filteredData[filteredData.length - 1].date); 
        lastDay.setDate(lastDay.getDate() + i++);
        const day = lastDay.toLocaleDateString("en-GB", {
          weekday: "short",
        });
        dayArray.push(day);
  
      }
      console.log(data); 
      setStressData(data); // เรียงข้อมูลจากเก่าไปใหม่
      setLabel(dayArray);
    };

    fetchStressData();
  }, []); 

  // ฟังก์ชั่นสำหรับแปลงค่า stress level เป็นข้อความ
  const yAxisLabel = (value) => {
    if (value === 0) return "low";
    if (value === 1) return "moderate";
    if (value === 2) return "very";
    return "most";
  };

  // คำนวณค่าเฉลี่ยของ stress level ของทั้งสัปดาห์
  const weeklyAverage = (data) => {
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    return sum / data.length;
  };

  // ข้อความแสดงค่าเฉลี่ยของ stress level ของทั้งสัปดาห์
  const averageStressText = (average) => {
    let stressLevel = "low";
    if (average >= 1 && average < 2) stressLevel = "moderate";
    else if (average >= 2 && average < 3) stressLevel = "very";
    else if (average >= 3) stressLevel = "most";

    return `Your weekly stress average is ${average.toFixed(
      2
    )} indicating ${stressLevel} stress level. Great Job!`;
  };

  // ข้อมูล stress level ของทุกวันในสัปดาห์
  //const stressData = [0, 1, 2, 3, 2, 1, 3];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Mood Week Diary</Text>
          <Text style={styles.subtitle}>Day 7/7</Text>
        </View>
        <View style={styles.iconRow}>
          <Image
            source={require("../assets/Emotion/e01.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/Emotion/e02.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/Emotion/e03.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/Emotion/e04.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/Emotion/e05.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/Emotion/e06.png")}
            style={styles.icon}
          />
          <Image
            source={require("../assets/Emotion/e07.png")}
            style={styles.icon}
          />
        </View>
      </View>
      <View>
        <Text style={styles.title}>Stress Assessment</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isWeekly ? styles.activeButton : null]}
            onPress={() => setIsWeekly(true)}
          >
            <Text
              style={[
                styles.buttonText,
                isWeekly ? styles.activeButtonText : null,
              ]}
            >
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !isWeekly ? styles.activeButton : null]}
            onPress={() => setIsWeekly(false)}
          >
            <Text
              style={[
                styles.buttonText,
                !isWeekly ? styles.activeButtonText : null,
              ]}
            >
              2 Weeks
            </Text>
          </TouchableOpacity>
        </View>

        <LineChart
          data={{
            labels: label,
            datasets: [{ data: stressData }],
          }}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: COLORS.purple,
            backgroundGradientFrom: COLORS.purple,
            backgroundGradientTo: COLORS.purple,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
            yAxisLabel: yAxisLabel,
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        <View style={styles.stressTextContainer}>
          <Text style={styles.stressText}>
            {averageStressText(weeklyAverage(stressData))}
          </Text>
        </View>
      </View>
      <View style={styles.buttonReport}>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => navigation.navigate("WeekReport")}
        >
          <Text style={styles.reportButtonText}>Weekly Report</Text>
        </TouchableOpacity>
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
    paddingTop: "20%",
    backgroundColor: COLORS.cream,
  },
  date: {
    fontSize: 16,
    color: COLORS.purple,
    fontSize: 30,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    maxWidth: 360,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a202c",
    marginTop: 10,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#718096",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 40,
    height: 40,
  },
  stressText: {
    fontSize: 16,
    color: "#1a202c",
    marginTop: 10,
  },
  stressTextContainer: {
    backgroundColor: COLORS.purple,
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  stressText: {
    fontSize: 16,
    color: COLORS.white,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: COLORS.purple,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.black,
  },
  activeButtonText: {
    color: COLORS.white,
  },
  buttonReport: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  reportButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: COLORS.purple,
  },
  reportButtonText: {
    fontSize: 16,
    color: COLORS.white,
  },
});

export default Dashboard;
