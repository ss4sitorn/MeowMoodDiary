import React, { useState } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'; 
import { COLORS } from "../constants/colors";
import styles from "../src/styles/styles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Perform login logic here
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

Login.navigationOptions = {
  title: 'Login'
};

export default Login;
