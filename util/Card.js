import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../constants/colors";

const Card = ({ card }) => {
  const iconList = [
    require("../assets/Flowers/f01.png"),
    require("../assets/Flowers/f02.png"),
    require("../assets/Flowers/f03.png"),
    require("../assets/Flowers/f04.png"),
  ];

  return (
    <View style={[styles.card, { backgroundColor: card.bgColor }]}>
      <View style={styles.iconBackground}>
        <Image source={iconList[card.icon]} style={styles.icon} />
      </View>
      <Text style={styles.quote}>{card.quote}</Text>
      <Text style={styles.signature}>{card.signature}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "70%",
    height: "100%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.darkgreen,
  },
  icon: {
    width: 80,
    height: 80,
  },
  quote: {
    top: 75,
    marginBottom: 5,
    fontSize: 20,
    fontStyle: "Bold",
  },
  signature: {
    top: 120,
    marginBottom: 5,
    fontSize: 15,
    fontStyle: "italic",
  },
  iconBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    top: 45,
  },
});

export default Card;