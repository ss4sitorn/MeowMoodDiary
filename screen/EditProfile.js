import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, TextInput, View, SafeAreaView, StyleSheet, Alert, Image } from 'react-native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, storage } from '../src/firebase/config';
import BackButton from "../util/BackButton";

const EditProfile = ({ route }) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState(route.params?.username.value);
    const [profilePic, setProfilePic] = useState();

    console.log(route.params);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleUpdate = async () => {
          const userDocRef = doc(db, 'users', auth.currentUser.uid);
          try {
              await updateDoc(userDocRef, { username, profilePic });
              handleBackPress();
          } catch (error) {
              console.error('Error updating profile: ', error);
              Alert.alert('Error', 'Failed to update profile. Please try again.');
          }
      };

    const askPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'We need camera roll permissions to make this work!');
        }
    };

    const fetchProfilePicture = async () => {
        try {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            const userData = userDoc.data();
            if (userData && userData.profilePic) {
                setProfilePic(userData.profilePic);
            }
        } catch (error) {
            console.error('Error fetching profile picture: ', error);
        }
    };

    const handleProfilePicChange = async () => {
      try {
          const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
          });
  
          if (!result.canceled) {
              const uri = result.assets[0].uri;
              const user = auth.currentUser;
  
              if (user) {
                  const storageRef = ref(storage, `profilePictures/${user.uid}`);
                  const response = await fetch(uri);
                  const blob = await response.blob();
  
                  await uploadBytes(storageRef, blob);
  
                  const downloadURL = await getDownloadURL(storageRef);
  
                  setProfilePic(downloadURL); // Set the profile picture URL
              } else {
                  console.error('User not signed in');
              }
          }
      } catch (error) {
          console.error('Error picking image: ', error);
          Alert.alert('Error', 'Failed to pick image. Please try again.');
      }
  };
  

    useEffect(() => {
        askPermission();
        fetchProfilePicture(); // Fetch profile picture when the component mounts
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerzone}>
                <View style={styles.backButtonContainer}>
                    <BackButton onPress={handleBackPress} />
                </View>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={handleProfilePicChange}>
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} style={styles.profileImage} />
                        ) : (
                            <Icon name="person-circle-outline" size={100} color="COLORS.darkgreen" />
                        )}
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
        justifyContent: "flex-start",
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
    profileImage: {
      width: 135,
      height: 135,
      borderRadius: 67.5, // half the size to make it circular
  },
});

export default EditProfile;