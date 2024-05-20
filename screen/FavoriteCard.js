import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import BottomBar from "../util/BottomBar";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/AntDesign";
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
  addDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase/config";
import Card from "../util/Card";
import { Accelerometer } from "expo-sensors";
import { getAuth } from "firebase/auth";
import BackButton from "../util/BackButton";

const FavoriteCard = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const user = auth.currentUser;
  const handleBackPress = () => {
    navigation.goBack(); // navigate back to the previous screen
  };
  const images = {
    f01: require("../assets/Flowers/f01.png"),
    f02: require("../assets/Flowers/f02.png"),
    f03: require("../assets/Flowers/f03.png"),
    f04: require("../assets/Flowers/f04.png"),

    // add all your images here
  };

  async function getFavCard() {
    const favCardCollectionRef = collection(db, "users", user.uid, "favCard");
    const favCardSnapshot = await getDocs(favCardCollectionRef);

    const favCards = favCardSnapshot.docs.map((doc) => doc.data());

    return favCards;
  }
  useEffect(() => {
    const fetchCards = async () => {
      const cards = await getFavCard();
      setCardData(cards);
      console.log(cards);
    };

    fetchCards();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

          <BackButton onPress={handleBackPress} />
        <Text style={styles.headerText}>Favorite Card</Text>
      </View>
    
      {cardData.map((item, index) => {
        const card = item.card;
        return (
          <View style={[styles.card, { backgroundColor: card.bgColor }]}>
            <View style={styles.iconBackground}>
              <Image source={images[card.icon]} style={styles.icon} />
            </View>
            <Text style={styles.quote}>{card.quote}</Text>
          </View>
        );
      })}
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
    justifyContent: "flex-start",
    width: "100%",
    
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 30,
    color: COLORS.pink,
    fontWeight: "bold",
    paddingLeft: 20,
    top: -5,
  },

  card: {
    width: "90%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.darkgreen,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 30,
  },
  icon: {
    width: 80,
    height: 80,
  },

  quote: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.black,
    position: "absolute",
    left: 130,
  },
  backButtonContainer: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
});

export default FavoriteCard;
