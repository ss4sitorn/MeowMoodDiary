import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { COLORS } from "../constants/colors";
import styles from "../src/styles/styles";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const db = getFirestore(firebaseApp);

  const handleRegister = async () => {
    // Check if all fields are filled
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  

    try {
      // Perform registration logic here
        // To create a new user
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // The user has been registered
                const user = userCredential.user;
                console.log('User registered: ', user);
                showAlert('Register success', user.email);
                try {
                  await setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email
                  });
                    showAlert('Success', 'Account created successfully');
                  navigation.navigate('Login')
                } catch (e) {
                  showAlert('Error', e.message)
                }
            })
            .catch((error) => {
                showAlert('Register failed', error.toString());
            });
      // Navigate to the PIN creation screen after successful registration

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
      <Text style={styles.errorText}>{error}</Text>
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
        <Text style={{ color: 'rgba(128, 128, 128, 0.5)' }}> ** Password must be at least 6 characters long</Text>
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

export default Register;
