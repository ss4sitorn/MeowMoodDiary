import React, { useState, useRef } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { COLORS } from "../constants/colors";

const PinTemp = ({ onPinChange }) => {
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

    // Notify parent component about PIN change
    onPinChange(newPin.join(''));
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {pin.map((value, index) => (
        <TextInput
          key={index}
          ref={ref => inputRefs.current[index] = ref}
          style={pinStyles.input}
          value={value}
          onChangeText={text => handleTextChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry={true}
        />
      ))}
    </View>
  );
};

const pinStyles = StyleSheet.create({
  input: {
    borderRadius: 15,
    padding: 5,
    width: '15%',
    backgroundColor: COLORS.white,
    borderColor: COLORS.darkgreen,
    borderWidth: 1,
    margin: 5,
    textAlign: 'center',
  },
});

export default PinTemp;
