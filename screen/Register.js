import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'; 
import { COLORS } from "../constants/colors";
import styles from "../src/styles/styles";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Perform registration logic here

      // Navigate to the PIN creation screen after successful registration
      navigation.navigate('Pin');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Hello!</Text>
        <Text style={styles.subheadingText}>May I get to know you?</Text>
      </View>
      {error ? <Text>{error}</Text> : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20, 
//     backgroundColor: COLORS.cream,
//   },
//   headingContainer: {
//     marginBottom: 20,
//   },
//   headingText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   subheadingText: {
//     fontSize: 16,
//   },
//   inputContainer: {
//     marginBottom: 20,
//     width: '100%',
//   },
//   label: {
//     marginBottom: 10,
//     fontSize: 16,
//     color: COLORS.darkgreen,
//   },
//   input: {
//     borderRadius: 15,
//     padding: 5,
//     width: '100%',
//     backgroundColor: COLORS.white,
//   },
//   buttonContainer: {
//     width: '100%',
//     alignItems: 'flex-end',
//   },
//   button: {
//     backgroundColor: COLORS.lightgreen,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     width: '40%',
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: COLORS.white,
//     textAlign: 'center',
//   },
// });

export default Register;
