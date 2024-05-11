import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'; 
import { COLORS } from '../constants/colors';
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../util/BackButton";
const ForgotPassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      // Perform password reset logic here
    } catch (e) {
      setError(e.message);
    }

  };
  const handleBackPress = () => {
    navigation.navigate("Setting");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <BackButton style={styles.back} onPress={() => handleBackPress()} />
        <Text style={styles.headingText}>Reset Password</Text>
     
      </View>
      {error ? <Text>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Old Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ForgotPassword.navigationOptions = {
  title: 'Forgot Password'
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: COLORS.cream,
  },
  headingContainer: {
    marginBottom: 20,
  },
  headingText: {
    marginTop: 20,
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

export default ForgotPassword;
