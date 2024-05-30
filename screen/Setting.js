import { View,Text,TouchableOpacity,StyleSheet,Image,TextInput,Switch} from "react-native";
import React, { Profiler, useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../util/BottomBar";
import showConfirmationDialog from "../util/alert-confirm-custom";
import firebaseApp from "../src/firebase/config";
import { getFirestore , doc , getDoc} from "firebase/firestore";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
import {LogOut, getEmail, getUsername, resetPassword, deleteFieldWithValue, getUserData} from "../util/firebase-help";
import { NavigationContainer } from '@react-navigation/native';
import { get } from "firebase/database";


const Setting = () => {const auth = getAuth(firebaseApp);
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [email,setEmail]=useState('');
  const [username, setUsername] = useState('');
  const [ Profile , setProfile] = useState('');
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    deleteFieldWithValue("pin");
  }

  const getStatePin = async () => {
    const pin = await getUserData("pin");
    if (pin) {
      setIsEnabled(true);
    }else {
      setIsEnabled(false);
    }

  }
  const getProfile = async () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getFirestore();
    const userDocRef = doc(db, "users", uid); // Get a reference to the user document
    const userDocSnapshot = await getDoc(userDocRef); // Get the document snapshot
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      setProfile(userData.profilePic);
      console.log(userData.profilePic);
    } else {
      console.log("No such document!");
    }
  }


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail(getEmail());
    setUsername(getUsername());
      getStatePin();
      getProfile();
    });
    return unsubscribe;
  }, [navigation]);
  const handleResetPassword = () => {
    resetPassword();
  };
  const handleResetPin = () => {
    navigation.navigate("ResetPin");
  };
  const handleEditProfilePress = () => {
    navigation.navigate('EditProfile' , {username: username});
  };
  const user = auth.currentUser;
  //delete user from firebase auth and database
  const handleDeleteAccount = () => {
    user.delete().then(() => {
      console.log("User deleted");
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerzone}>
        <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.Profile} onPress={handleEditProfilePress}>
        {Profile ? (
                            <Image source={{ uri: Profile }} style={styles.profileImage} />
                        ) : (
                            <Icon name="person-circle-outline" size={100} color={COLORS.lightgreen} />
                        )}
            <Icon
              style={styles.editIconContainer}
              name="pencil"
              size={25}
              color="darkgreen"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}> {username}    </Text>
        <Text style={styles.email}> {email}</Text>
      </View>
      <View style={styles.Title}>
        <Text style={styles.PageTitle}>setting</Text>
      </View>

      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingButton2} onPress={handleResetPin}>
          <View style={styles.Title}><Icon name="keypad-outline" size={40}  style={styles.settingicon} />
          <Text style={styles.settingText}>Pin</Text></View>
          <Switch style={width=200}
        trackColor={{false: '#767577', true: '#80B7A2'}}
        thumbColor={isEnabled ? '#ADD495' : '#80B7A2'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}onPress={handleResetPassword} >
        <Icons name="password" size={40}  style={styles.settingicon} />
          <Text style={styles.settingText}>    Reset Password </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={() => {
          LogOut(navigation)
        } }>
          <Icon name="log-out-outline" size={40}  style={styles.settingicon} />
          <Text style={styles.settingText}>    Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={() => showConfirmationDialog('Warning', 'Do you want to delete your account?',()=>{{handleDeleteAccount()}
            navigation.navigate("Welcome"),()=>{console.log('cancle logout')}}) }>
        <Icons name="delete" size={40}  style={styles.settingicon} />
          <Text style={styles.settingText}> Delete Account </Text>
        </TouchableOpacity>
      </View>

      <BottomBar navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,

    justifyContent: "flex-start",
    paddingTop: "20%",
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
  settingButton: {
    width: "100%",
    backgroundColor: COLORS.lightpurple,
    padding: 20,
    alignItems: "left",
    flexDirection: "row",

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
  settingicon: {
    color: COLORS.black,
  },
  settingButton2: {
    width: "100%",
    backgroundColor: COLORS.lightpurple,
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Title: {
    flexDirection: "row",
  },
  profileImage: {
    width: 135,
    height: 135,
    borderRadius: 67.5, // half the size to make it circular
},

});
export default Setting;