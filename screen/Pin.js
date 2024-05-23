import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'; 
import { COLORS } from "../constants/colors";
import styles from "../src/styles/styles";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import PinTemp from '../util/PinTemp';

const Pin = ({ navigation, route }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const db = getFirestore(firebaseApp);
  const handleSubmit = async () => {
    try {
      // convert pin array to string
        const pins = pin.join('');
      await setDoc(doc(db, "users", uid), {
        pin: pins,
      });
        showAlert('Success', 'PIN created successfully');
      navigation.navigate('Login')
    } catch (e) {
      showAlert('Error', e.message)
    }
  };
  // const PinInput = () => {
  //   const inputRefs = useRef([]);
  
  //   const handleTextChange = (text, index) => {
  //     const newPin = [...pin];
  //     newPin[index] = text;
  //     setPin(newPin);
  
  //     if (text && index < 3) {
  //       inputRefs.current[index + 1].focus();
  //     } else if (text === '' && index > 0) {
  //       inputRefs.current[index - 1].focus();
  //     }
  //   };

  //   return (
  //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //       {pin.map((value, index) => (
  //         <TextInput
  //           key={index}
  //           ref={ref => inputRefs.current[index] = ref}
  //           style={pinStyles.input}
  //           value={value}
  //           onChangeText={text => handleTextChange(text, index)}
  //           keyboardType="numeric"
  //           maxLength={1}
  //           secureTextEntry={true}
  //         />
  //       ))}
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>PIN</Text>
        <Text style={styles.subheadingText}> </Text>
      </View>
      {error ? <Text>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {align: "center"}]}> You favorite 4 digits number </Text>
        <PinTemp />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const pinStyles = StyleSheet.create({
  input: {
    borderRadius: 15,
    padding: 5,
    width: '15%',
    backgroundColor: COLORS.cream,
    borderColor: COLORS.darkgreen,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center',
  },
});


export default Pin;
