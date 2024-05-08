import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'; 
import { COLORS } from "./constants/colors";
import styles from "./src/styles/styles";

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

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
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

export default ForgotPassword;
