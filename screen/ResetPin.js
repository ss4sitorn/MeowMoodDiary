import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PinTemp from "../util/PinTemp";
import styles from "../src/styles/styles";

const ResetPin = ({ setResetPin }) => {
  const navigation = useNavigation();
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    if (pin.length !== 4) {
      Alert.alert('Error', 'Please enter a 4-digit PIN');
      return;
    }

    try {
      navigation.navigate("ConfirmPin", { pin });
    } catch (e) {
      console.error(e);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <PinTemp
        heading="PIN"
        label="Your Favorite 4 Digits Number"
        onPinChange={setPin}
      />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
        <Text style={styles.buttonText}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPin;