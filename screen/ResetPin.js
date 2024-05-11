import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React, { Profiler, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../util/BottomBar";


const ResetPin = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate("Setting");
  };


  
  
  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>PIN</Text>

 

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "flex-start",
    backgroundColor: COLORS.white,
    
},
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  header: {
    fontSize:   30, 
    fontWeight: "bold",
    color: COLORS.darkgreen,
    marginTop: 45,
    paddingLeft: 80,

},
});
export default ResetPin;
