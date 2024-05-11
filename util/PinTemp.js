import React, { useState, useRef } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { COLORS } from "../constants/colors";


const PinTemp = ({ heading, label, onPinChange }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleTextChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    } else if (text === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    onPinChange(newPin.join(''));
  };

  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>{heading}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={[styles.label, {align: "center"}]}>{label}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {pin.map((value, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={styles.inputs}
              value={value}
              onChangeText={text => handleTextChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={true}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    borderRadius: 15,
    padding: 5,
    width: '15%',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkgreen,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.cream,
  },
  headingContainer: {
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkgreen,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.darkgreen,
  },

});
export default PinTemp;
