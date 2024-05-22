import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import BackButton from "../util/BackButton";
import { useNavigation } from "@react-navigation/native";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  getDoc,
  serverTimestamp
} from "firebase/firestore";
import firebaseApp from "../src/firebase/config";
import _ from "lodash";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const WeeklyHomework = ({ navigation }) => {
  const [homework, setHomework] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userHomeworkData, setUserHomeworkData] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        // Handle user not being logged in
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchHomework = async () => {
      if (!userId) return; // รอจนกว่าจะได้ userId

      const db = getFirestore(firebaseApp);
      const userHomeworkRef = doc(db, "userHomework", userId);

      try {
        const userHomeworkDoc = await getDoc(userHomeworkRef);
        let selectedHomeworkIds;

        if (
          userHomeworkDoc.exists() &&
          userHomeworkDoc.data().selectedHomework &&
          userHomeworkDoc.data().selectedHomeworkTimestamp &&
          Date.now() - userHomeworkDoc.data().selectedHomeworkTimestamp.toMillis() < 604800000 // 7 days in milliseconds
        ) {
          // ใช้ selectedHomework เดิมถ้ายังไม่หมดอายุ 7 วัน
          selectedHomeworkIds = userHomeworkDoc.data().selectedHomework;
        } else {
          // สุ่ม selectedHomework ใหม่และบันทึกลง Firestore
          const homeworkSnapshot = await getDocs(collection(db, "homework"));
          selectedHomeworkIds = _.sampleSize(homeworkSnapshot.docs, 3).map(
            (doc) => doc.id
          );
          await setDoc(
            userHomeworkRef,
            {
              selectedHomework: selectedHomeworkIds,
              selectedHomeworkTimestamp: serverTimestamp(),
            },
            { merge: true }
          );
        }

        // ดึงข้อมูลการบ้านที่เลือกแล้ว
        const homeworkData = await Promise.all(
          selectedHomeworkIds.map(async (homeworkId) => {
            const homeworkDoc = await getDoc(doc(db, "homework", homeworkId));
            return {
              ...homeworkDoc.data(),
              id: homeworkDoc.id,
              // completed: userHomeworkData[homeworkId] || false,
            };
          })
        );

        setHomework(homeworkData);
        setUserHomeworkData(userHomeworkDoc.exists() ? userHomeworkDoc.data() : {});
      } catch (error) {
        console.error("Error fetching homework:", error);
      }
    };

    fetchHomework();
  }, [userId]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const toggleHomework = async (id) => {
    if (!userId) return;

    setHomework((prevHomework) => {
      const updatedHomework = prevHomework.map((hwItem) =>
        hwItem.id === id ? { ...hwItem, completed: !hwItem.completed } : hwItem
      );

      const toggledItem = updatedHomework.find((hwItem) => hwItem.id === id);

      // Update in Firestore under the user's ID (create if not exists)
      const db = getFirestore(firebaseApp);
      const userHomeworkRef = doc(db, "userHomework", userId);
      setDoc(userHomeworkRef, { [id]: toggledItem.completed }, { merge: true });

      return updatedHomework;
    });
  };

  return (
    <View style={styles.container}>
       <View style={styles.backButtonContainer}>
          <BackButton onPress={handleBackPress} />
       </View>
       <Text style={styles.title}>Weekly Homework</Text>
       <View style={styles.moodhomework}>
          {homework.map((item) => (
             <View key={item.id} style={styles.check}>
                <TouchableOpacity
                   style={[
                      styles.checkbox,
                      userHomeworkData[item.id] && styles.checkedCheckbox,
                   ]}
                   onPress={() => toggleHomework(item.id)}
                >
                   {userHomeworkData[item.id] && (
                      <Text style={styles.checkmark}>✓</Text>
                   )}
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
