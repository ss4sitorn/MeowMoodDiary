import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from "react-native";
import BottomBar from "../util/BottomBar";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/AntDesign";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase/config";
import Card from "../util/Card";

const CardToday = () => {
  const navigation = useNavigation();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(firebaseApp);
  const handleAddCard = () => {
    navigation.navigate("CardCreate");
  };
  const handleFindCard = () => {};
  const handleFavCard = () => {};
  const handlefavcard = () => {
    navigation.navigate("FavoriteCard");
    // Go to fav card page
  };
  async function getCard() {
    const cardCollectionRef = collection(db, "card");
    const cardQuerySnapshot = await getDocs(cardCollectionRef);
    const cardList = [];
    cardQuerySnapshot.forEach((doc) => {
      cardList.push(doc.data());
    });
    const randomIndex = Math.floor(Math.random() * cardList.length);
    const randomCard = cardList[randomIndex];
    console.log(randomCard);
    console.log(randomCard.icon);

    setCard(randomCard);
    setLoading(false);
  }

  //   useEffect(() => {
  //     getCard();
  //   }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlefavcard}>
          {/* Go to fav card page */}
          <Text style={styles.title}>Card of the Day</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardcontainer}>
        {!loading && card && <Card card={card} />}
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
  cardcontainer: {
    height: "50%",
    width: "100%",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "40%",
  },
  footer: {},
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.darkgreen,
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

    },
    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "bold",
    }

});

export default CardToday;
