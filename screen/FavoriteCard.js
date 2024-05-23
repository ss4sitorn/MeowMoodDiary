import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Modal,
  TouchableHighlight,
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
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import firebaseApp from "../src/firebase/config";
import Card from "../util/Card";
import { Accelerometer } from "expo-sensors";
import { getAuth } from "firebase/auth";
import BackButton from "../util/BackButton";
import  showAlert  from "../util/alert-custom";




const FavoriteCard = () => {
  const navigation = useNavigation();

  const [cardData, setCardData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    const favCardColRef = collection(db, "users", user.uid, "favCard");
    const favCardSnapshot = await getDocs(favCardColRef);
    const favCardData = favCardSnapshot.docs.map((doc) => doc.data());

    setCardData(favCardData);
  }

  // async function deleteCard(selectedCard) {
  //   if (!selectedCard || typeof selectedCard !== "object") {
  //     console.error("selectedCard is null or not an object:", selectedCard);
  //     return;
  //   }

  //   const favCardDocRef = doc(
  //     db,
  //     "users",
  //     user.uid,
  //     "favCard",
  //     selectedCard.id
  //   );
  //   console.log("Deleting card with ID:", selectedCard.id);

  //   await deleteDoc(favCardDocRef);

  //   // Update the local state
  //   setCardData(cardData.filter((item) => item.id !== selectedCard.id));
  // }
  async function deleteCard(selectedCard) {
    if (!selectedCard || typeof selectedCard !== "object") {
      console.error("selectedCard is null or not an object:", selectedCard);
      return;
    }

    const favCardDocRef = doc(
      db,
      "users",
      user.uid,
      "favCard",
      selectedCard.id
    );
    console.log("Deleting card with ID:", selectedCard.id);

    await deleteDoc(favCardDocRef);

    // Fetch the cards from Firebase again
    const favCardCollectionRef = collection(db, "users", user.uid, "favCard");
    const favCardSnapshot = await getDocs(favCardCollectionRef);
    const newCardData = favCardSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Update the local state
    setCardData(newCardData);
    showAlert("Success", "Card deleted from favorite");
  }
  useEffect(() => {
    getFavCard();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBackPress} />
        <Text style={styles.headerText}>Favorite Card</Text>
      </View>

      {cardData.map((item, index) => {
        // console.log("Card data:", item.card);
        const card = item.card;

        return (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: card.bgColor }]}
            onPress={() => {
              setSelectedCard(card);
              setModalVisible(true);
            }}
          >
            <View style={styles.iconBackground}>
              <Image source={images[card.icon]} style={styles.icon} />
            </View>
            <Text style={styles.quote}>{card.quote}</Text>
          </TouchableOpacity>
        );
      })}
      {/* modal  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlay} />
        <View style={styles.modalView}>
          <View style={styles.cardContainer}>
            <Card card={selectedCard} />
          </View>
          <View style={styles.ButtonContainer}>
            <TouchableOpacity
              style={{ ...styles.deleteButton }}
              onPress={() => { deleteCard(selectedCard);
              setModalVisible(!modalVisible);
               }}
            >
   
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.HideButton }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

  modalView: {
    width: "90%",
    height: "80%",
    alignSelf: "center",
    position: "absolute",
    top: "10%",
    borderRadius: 10,
    backgroundColor: "#fff4e8",
    borderWidth: 1,
    borderColor: "#dedede",
  },
  ButtonContainer: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: "30%",
    height: "30%",
    backgroundColor: COLORS.pink,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  HideButton: {
    width: "30%",
    height: "30%",
    backgroundColor: COLORS.darkgreen,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cardContainer: {
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  overlay: {
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(242, 240, 239, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: COLORS.black,
    fontWeight: "bold",
  },
});

export default FavoriteCard;
