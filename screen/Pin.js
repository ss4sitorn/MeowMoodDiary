import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'; 
import { COLORS } from "../constants/colors";

const Pin = ({ navigation }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // Perform registration form submission logic here
      navigation.navigate('Login'); // Navigate to the login screen after registration
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>PIN</Text>
        <Text style={styles.subheadingText}> </Text>
      </View>
      {error ? <Text>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}> Your favorite 4 digits </Text>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={text => setPin(text)}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}> Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  subheadingText: {
    fontSize: 16,
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
  input: {
    borderRadius: 15,
    padding: 5,
    width: '100%',
    backgroundColor: COLORS.white,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: COLORS.lightgreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '40%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },
});

export default Pin;