import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet  } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import PinTemp from "../util/PinTemp";
import { COLORS } from "../constants/colors";
import BackButton from "../util/BackButton";
 
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
  const handleBackPress = () => {
    navigation.navigate("ResetPin");
  };
  

  return (
    <View style={styles.container}>
      <BackButton style={styles.back} onPress={() => handleBackPress()} />
      <View style={styles.inputContainer}>
      <PinTemp
        heading="PIN"
        label="Please confirm the new PIN"
        onPinChange={setPin}
      />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}> Confirm Reset </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.cream,
  },

  back : {
    position: "absolute",
    top: 0,
    left: 50,
    zIndex: 1,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.lightgreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    width: '40%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default ConfirmPin;
