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
import firebaseApp from "../src/firebase/config";
import { getDataCollectionWithUid } from "../util/firebase-help";
import { getFirestore } from "firebase/firestore";
import { imageMoodStore } from "../util/image-store";

const Dashboard = ({ navigation }) => {
  const [isWeekly, setIsWeekly] = useState(true);
  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [stressData, setStressData] = useState(Array(14).fill(0));
  const [moodImages, setMoodImages] = useState(Array(14).fill(null));

  useEffect(() => {
    const fetchStressData = async () => {
      const db = getFirestore(firebaseApp);
      const today = new Date();
      const daysAgo = isWeekly ? 6 : 13;
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - daysAgo);

      const dataDia = await getDataCollectionWithUid("diaries");
      const data = Array(daysAgo + 1).fill(0);
      const images = Array(daysAgo + 1).fill(null);

      dataDia.forEach((doc) => {
        const docDate = new Date(doc.date);
        if (docDate >= startDate && docDate <= today) {
          const diffDays = Math.floor((today - docDate) / (1000 * 60 * 60 * 24));
          data[daysAgo - diffDays] = doc.score || 0;
          images[daysAgo - diffDays] = imageMoodStore[doc.mood] || null;
        }
      });

      setStressData(data);
      setMoodImages(images);
    };

    fetchStressData();
  }, [isWeekly]);

  const yAxisLabel = (value) => {
    if (value === 0) return "low";
    if (value === 1) return "moderate";
    if (value === 2) return "very";
    return "most";
  };

  const calculateAverage = (data) => {
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    return sum / data.length;
  };

  const averageStressText = (average) => {
    let stressLevel = "low";
    if (average >= 1 && average < 2) stressLevel = "moderate";
    else if (average >= 2 && average < 3) stressLevel = "very";
    else if (average >= 3) stressLevel = "most";

    return `Your stress average is ${average.toFixed(
      2
    )}, indicating ${stressLevel} stress level. Great Job!`;
  };

  const labels = isWeekly
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Mood Week Diary</Text>
          <Text style={styles.subtitle}>Day {isWeekly ? "7/7" : "14/14"}</Text>
        </View>
        <View style={styles.iconRow}>
          {moodImages.slice(-labels.length).map((image, index) => (
            <Image
              key={index}
              source={image ? image : require("../assets/Emotion/e01.png")}
              style={styles.icon}
            />
          ))}
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
            labels: labels,
            datasets: [{ data: stressData.slice(-labels.length) }],
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
            {averageStressText(calculateAverage(stressData.slice(-labels.length)))}
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
    flexWrap: "wrap",
  },
  icon: {
    width: 40,
    height: 40,
    margin: 2,
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
    marginHorizontal: 5,
  },
  reportButtonText: {
    fontSize: 16,
    color: COLORS.white,
  },
});

export default Dashboard;
