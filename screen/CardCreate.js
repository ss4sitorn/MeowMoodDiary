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
import { useNavigation } from "@react-navigation/native";
import BackButton from "../util/BackButton";

const CardCreate = () => {
  const navigation = useNavigation();
  // List of available colors
  const colorList = ["#FFF8F8", "#ECDBC9", "#F898A4", "#ADD495", "#80B7A2"];

  // List of available flower icons
  const iconList = [
    {
      name: "f01",
      image: require("../assets/Flowers/f01.png"),
    },
    {
      name: "f02",
      image: require("../assets/Flowers/f02.png"),
    },
    {
      name: "f03",
      image: require("../assets/Flowers/f03.png"),
    },
    {
      name: "f04",
      image: require("../assets/Flowers/f04.png"),
    },
  ];
  // State variables to hold default values for the card
  const [defaultIcon, setDefaultIcon] = useState(iconList[0]);

  const [defaultQuote, setDefaultQuote] = useState("Default Quote");
  const [defaultSignature, setDefaultSignature] = useState("Default Signature");
  const [defaultBgColor, setDefaultBgColor] = useState(COLORS.lightgreen);

  // State variables to hold user input for the card
  const [icon, setIcon] = useState(defaultIcon);
  const [quote, setQuote] = useState(defaultQuote);
  const [signature, setSignature] = useState(defaultSignature);
  const [bgColor, setBgColor] = useState(defaultBgColor);

  // const handleMood = () => {
  //   // Update default card information based on user input
  //   setDefaultIcon(icon);
  //   setDefaultQuote(quote);
  //   setDefaultSignature(signature);
  //   setDefaultBgColor(bgColor);

  // };

  useEffect(() => {
    // Update default card information based on user input
    setDefaultIcon(icon.image);
    setDefaultQuote(quote);
    setDefaultSignature(signature);
    setDefaultBgColor(bgColor);
  }, [icon, quote, signature, bgColor]);

  const handleColorSelection = (selectedColor) => {
    setBgColor(selectedColor);
    console.log(selectedColor);
  };

  const handleIconSelection = (selectedIcon) => {
    setIcon(selectedIcon);
    console.log("this default icon ", defaultIcon);
    console.log("this selectedicon path ", selectedIcon.image);
    console.log("this selectedicon name ", selectedIcon.name);
  };

  // const renderIconBackground = () => (
  //   <View style={styles.iconBackground}>
  //     <Image source={defaultIcon} style={styles.icon} />
  //   </View>
  // );

  const handleBackPress = () => {
    navigation.navigate("Home");
  };

  const handleCardMood = () => {
    navigation.navigate("CardMood", {
      icon: icon.name,
      quote: quote,
      signature: signature,
      bgColor: bgColor,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBackPress} />
        <Text style={styles.headerText}>Design Your Card</Text>
      </View>

      {/* Default card preview */}
      <View style={[styles.card, { backgroundColor: defaultBgColor }]}>
        <View style={styles.iconBackground}>
          <Image source={defaultIcon} style={styles.icon} />
        </View>
        <Text style={styles.quote}>{defaultQuote}</Text>
        <Text style={styles.signature}>{defaultSignature}</Text>
      </View>

      {/* Icon/Color selection */}
      <View style={styles.selectionContainer}>
        <View style={styles.titleInputContainer}>
          <Text style={styles.selectionTitle}>Select Icon :</Text>
          <View style={styles.iconSelection}>
            {iconList.map((icon, index) => (
              <TouchableOpacity
                key={index}
                style={styles.iconOption}
                onPress={() => handleIconSelection(icon)}
              >
                <Image source={icon.image} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.titleInputContainer}>
          <Text style={styles.selectionTitle}>Select Color :</Text>
          <View style={styles.colorSelection}>
            {colorList.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorOption, { backgroundColor: color }]}
                onPress={() => handleColorSelection(color)}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        {/* Quote input */}
        <View style={styles.titleInputContainer}>
          <Text style={styles.inputTitle}>Quote :</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Quote"
            onChangeText={(text) => setQuote(text)}
            value={quote}
          />
        </View>
        {/* Signature input */}
        <View style={styles.titleInputContainer}>
          <Text style={styles.inputTitle}>Signature :</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Signature"
            onChangeText={(text) => setSignature(text)}
            value={signature}
          />
        </View>
      </View>

      {/* Mood button */}
      <TouchableOpacity style={styles.button} onPress={handleCardMood}>
        <Text style={styles.buttonText}>Mood Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cream,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 30,
    color: COLORS.pink,
    fontWeight: "bold",
    paddingLeft: 20,
    top: -5,
  },
  card: {
    width: "65%",
    height: "55%",
    backgroundColor: COLORS.pink,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.darkgreen,
    marginTop: 20,
  },
  icon: {
    width: 80,
    height: 80,
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
  quote: {
    top: 75,
    marginBottom: 5,
  },
  signature: {
    top: 75,
    marginBottom: 5,
  },
  selectionContainer: {
    width: "90%",
    marginBottom: 5,
  },
  titleInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: COLORS.darkgreen,
  },
  iconSelection: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorSelection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  iconOption: {
    marginHorizontal: 5,
    width: 50,
    height: 50,
    borderRadius: 5,
    borderColor: COLORS.black,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  colorOption: {
    marginHorizontal: 5,
    width: 40,
    height: 30,
    borderRadius: 5,
    borderColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputContainer: {
    width: "90%",
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: COLORS.darkgreen,
  },
  input: {
    height: 30,
    width: "70%",
    borderWidth: 1,
    borderColor: COLORS.darkgreen,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
    color: COLORS.black,
  },
  button: {
    backgroundColor: COLORS.purple,
    paddingVertical: 10,
    borderRadius: 5,
    width: "35%",
    alignItems: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
  },
  backButtonContainer: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
});

export default CardCreate;
