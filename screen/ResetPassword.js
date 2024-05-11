import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'; 
import styles from "../src/styles/styles";
import Icon from "react-native-vector-icons/Ionicons";

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
        <Text style={styles.headingText}>Reset Password</Text>
        <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={handleBackPress}>
                <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            </View>
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
