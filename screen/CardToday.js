import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import BottomBar from "../util/BottomBar";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Fontisto";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  where,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase/config";
import Card from "../util/Card";
import { Accelerometer, DeviceMotion } from "expo-sensors";
import { getAuth } from "firebase/auth";
import  showAlert  from "../util/alert-custom";

const CardToday = () => {
  const navigation = useNavigation();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [shakeDetected, setShakeDetected] = useState(false);
  const [allowShake, setAllowShake] = useState(true);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const user = auth.currentUser;
  const currentDate = new Date().toISOString().slice(0, 10);

  const handleAddCard = () => {
    navigation.navigate("CardCreate");
  };
  const gotofav = () => {
    navigation.navigate("FavoriteCard");
  };

  async function handleFavCard() {
    try {
      const user = getAuth(firebaseApp).currentUser;
      const favCardCollectionRef = collection(db, "users", user.uid, "favCard");
      if (card != null) {
        const favCardDocRef = doc(favCardCollectionRef, card.id); // Create a reference to the document with the same ID as card.id
        const favCardSnapshot = await getDoc(favCardDocRef);

        if (favCardSnapshot.exists()) {
          console.log("This card has already been added.");
        } else {
          await setDoc(favCardDocRef, {
            card: card,
          });
          showAlert("Success", "Card added to favorite");
          console.log("Card added to favorite");
        }
      } else {
        showAlert("Error", "No card to add to favorite");
        console.log("No card to add to favorite");
      }
    } catch (error) {
      console.error("Error fetching card:", error);
    }
  }

  async function getCard() {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Fetch the user's latest mood from the diaries collection
      const diariesQuery = query(
        collection(db, "diaries"),
        where("uid", "==", user.uid),
        orderBy("date", "desc"),
        limit(1)
      );
      const diariesQuerySnapshot = await getDocs(diariesQuery);

      if (diariesQuerySnapshot.empty) {
        console.log("No diary entries found");
        setLoading(false);
        return;
      }

      const latestDiary = diariesQuerySnapshot.docs[0];
      const userMood = latestDiary.data().mood;

      // Fetch the cards from the card collection matching the user's mood
      const cardCollectionRef = collection(db, "card");
      const cardQuerySnapshot = await getDocs(cardCollectionRef);
      const cardList = [];
      cardQuerySnapshot.forEach((doc) => {
        const cardData = doc.data();
        cardData.id = doc.id; // Add the document ID to the cardData
        if (cardData.mood === userMood) {
          cardList.push(cardData);
        }
      });

      if (cardList.length === 0) {
        console.log("No cards matching the user's mood found");
        setLoading(false);
        return;
      }

      // Select a random card from the list
      const randomIndex = Math.floor(Math.random() * cardList.length);
      const randomCard = cardList[randomIndex];
      setCard(randomCard);
    

      // Set the diary document
      const diaryRef = doc(db, "diaries", `${user.uid}-${currentDate}`);
      await setDoc(diaryRef, {
        mood: userMood,
        uid: user.uid,
        date: currentDate,
      });

      setLoading(false);
    } catch (error) {
      if (
        error.code === "failed-precondition" &&
        error.message.includes("The query requires an index.")
      ) {
        console.error(
          "Index creation required. Please visit the following link to create the index:"
        );
        console.error(error.message.split(" ").slice(-1).join(" ")); // Logs the URL to create the index
      } else {
        console.error("Error fetching card:", error);
      }
      setLoading(false);
    }
  }

  const handleData = (data) => {
    setData(data);
    if (Math.abs(data.x) + Math.abs(data.y) + Math.abs(data.z) > 2) {
      setShakeDetected(true);
    }
  };

  useEffect(() => {
    if (shakeDetected && allowShake) {
      getCard();
      console.log("Random new card");
      setShakeDetected(false);
      setAllowShake(false);
    }
  }, [shakeDetected]);

  useEffect(() => {
    Accelerometer.setUpdateInterval(400);
    const subscription = Accelerometer.addListener(handleData);
    return () => {
      subscription && subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      DeviceMotion.setUpdateInterval(400);
      const subscription = DeviceMotion.addListener(handleData);
      return () => {
        subscription && subscription.remove();
      };
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      
        <Text style={styles.title} >
          Card Of The Day
        </Text>
        <Icons name="favorite" size={35} style={styles.favicon}  onPress={gotofav}/>
      </View>

      <View style={styles.cardContainer}>
        {!loading && card && <Card card={card} />}
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.shaketext}> Shake your phone to </Text>
        <Text style={styles.shaketext}> find new card </Text>
        <Text style={styles.warningtext}> pls selected mood before shake </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.FavButton} onPress={handleFavCard}>
          <Icon name="hearto" size={35} color={COLORS.pink} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getCard}>
          <Text style={styles.buttonText}>Find New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <BottomBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
  },
  cardContainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
    top: -60,
  },
  textcontainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    height: "10%",
  },
  footer: {},
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.pink,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: COLORS.pink,
    padding: 10,
    borderRadius: 5,
    width: "30%", // Adjusted width
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "2%", // Adjusted margin
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "bold",
  },
  FavButton: {
    alignItems: "center",
    // justifyContent: "center",
  },
  shaketext: {
    fontSize: 20,
    color: COLORS.darkgreen,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  warningtext: {
    fontSize: 14,
    color: COLORS.purple,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  favicon : {
    position: "absolute",
    right: 25,
    top: 10,
    color: COLORS.pink,
  
  },
});

export default CardToday;
