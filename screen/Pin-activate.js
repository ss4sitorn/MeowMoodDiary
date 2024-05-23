import React, { useState, useRef } from 'react';
import {Text, TouchableOpacity, TextInput, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { COLORS } from "../constants/colors";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";
import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import {getAuth} from "firebase/auth";
import {getUserData} from "../util/firebase-help";
import PinTemp from '../util/PinTemp';

const PinActivate = ({ navigation, route }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const db = getFirestore(firebaseApp);
  const handleSubmit = async () => {
    const user = getAuth(firebaseApp).currentUser;
     try {
        // convert pin array to string
      const pins = pin.join('');
      const de_pin = await getUserData("pin")
        if (de_pin == pins) {
            showAlert('Success', 'PIN activated successfully');
            navigation.navigate('Home')
        } else {
            showAlert('Error', 'PIN is incorrect')
        }
     } catch (e) {
       showAlert('Error', e.message)
     }
  };

  return (
    <SafeAreaView style={styles.container}>
        {/* <Text style={styles.headingText}>PIN</Text> */}
      {error ? <Text>{error}</Text> : null}
      
      <View style={styles.inputContainer}>
      <PinTemp heading="PIN" label="please input your 4 digits number" onPinChange={(newPin) => setPin(newPin.split(''))} />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}> Submit </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.cream,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    marginTop: 30,
  },
  button: {
    backgroundColor: COLORS.lightgreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    width: '40%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
  },



});



export default PinActivate;