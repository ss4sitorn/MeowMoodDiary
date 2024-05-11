import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PinTemp from "../util/PinTemp";
import styles from "../src/styles/styles";

const ConfirmPin = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { pin: originalPin } = route.params; // Retrieve original PIN from navigation parameters
  const [pin, setPin] = useState('');

  const handleSubmit = () => {
    if (pin.length !== 4) {
      Alert.alert('Error', 'Please enter a 4-digit PIN');
      return;
    }

    if (pin !== originalPin) {
      Alert.alert('Error', 'PINs do not match');
      return;
    }

    try {
      navigation.navigate("Setting");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <PinTemp
        heading="PIN"
        label="Please confirm the new PIN"
        onPinChange={setPin}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}> Confirm Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmPin;
