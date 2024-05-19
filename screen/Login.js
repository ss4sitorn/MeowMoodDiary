import React, { useState} from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet, Alert } from 'react-native';
import { COLORS } from "../constants/colors";
import styles from "../src/styles/styles";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";

const auth = getAuth(firebaseApp);

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async () => {
    try {
        // To sign in an existing user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // The user is signed in
                const user = userCredential.user;
                console.log('User signed in: ', user);
                // showAlert('Login success', 'Nice to see you again!');
                navigation.navigate('Home');
            })
            .catch((error) => {
                showAlert('Login failed', 'email or password is incorrect');
            });
    } catch (e) {
      setError(e.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Welcome Back!</Text>
        <Text style={styles.subheadingText}> Happy to see you again </Text>
      </View>
      {error ? <Text>{error}</Text> : null}
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
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
</View>
    </View>
  );
};


export default Login;
