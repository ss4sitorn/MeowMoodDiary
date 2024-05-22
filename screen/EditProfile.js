import React, { useState,useEffect} from 'react';
import { Text, TouchableOpacity, TextInput, View, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS } from "../constants/colors";
import { getAuth,  signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";import firebaseApp from "../src/firebase/config";
import showAlert from "../util/alert-custom";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../util/BackButton";
import { getUsername } from '../util/firebase-help';
import { useNavigation } from '@react-navigation/native';
import { updateByValue } from '../util/firebase-help';

const auth = getAuth(firebaseApp);

const EditProfile = ({route})=> {
    const navigation = useNavigation();
    const [username, setUsername] = useState(route.params?.username.value);
    console.log(route.params);
  const handleBackPress = () => {
    navigation.goBack();
};
  const handleUpdate = async () => {
    updateByValue('username', username);
    handleBackPress();
  };


return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerzone}>
        <View style={styles.backButtonContainer}>
                <BackButton onPress={handleBackPress} />
        </View>
        <View style={styles.imageContainer}>
          <TouchableOpacity >
            <Icon name="person-circle" size={125} color={COLORS.darkgreen} />
            <Icon
              style={styles.editIconContainer}
              name="pencil"
              size={25}
              color="darkgreen"
            />
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={text => setUsername(text)}
            />
        </View>
        <View style={styles.inputContainer}>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: COLORS.cream,
        marginLeft: 20,
      },
    name: {
      fontSize: 20,
      color: COLORS.darkgreen,
      fontWeight: "bold",
    },
    Title: {
      width: "100%",
      backgroundColor: COLORS.darkgreen,
    },
  
    PageTitle: {
      fontSize: 28,
      color: COLORS.black,
      left: 20,
    },
    settingContainer: {
      width: "100%",
  
      alignItems: "center",
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
      },
    settingText: {
      color: COLORS.black,
      fontSize: 20,
    },
    headerzone: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "felx-start",
      marginBottom: 30,
      top: 0,
    },
    editIconContainer: {
      position: "absolute",
      bottom: 20,
      right: 20,
      backgroundColor: COLORS.pink,
      borderRadius: 50,
      padding: 5,
    },
    imageContainer: {
      position: "relative",
      marginTop: 20,
      width: 135,
      height: 135,
    },
    Profile: {
      width: "100%",
      height: "100%",
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
      backButtonContainer: {
        position: "absolute",
        top: 10,
        left: 5,
        zIndex: 1,
    },
    
  });
export default EditProfile;
