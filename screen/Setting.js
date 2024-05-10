import { View,Text,TouchableOpacity,StyleSheet,Image,TextInput,} from "react-native";
import React, { Profiler, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import BottomBar from "../util/BottomBar";


const Setting = () => {
  const navigation = useNavigation();

  const handleResetPassword = () => {
    navigation.navigate("ResetPassword");
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerzone}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.Profile}>
            <Icon name="person-circle" size={125} color={COLORS.darkgreen} />
            <Icon
              style={styles.editIconContainer}
              name="pencil"
              size={25}
              color="darkgreen"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Rithnapa Prasertsee</Text>
        <Text style={styles.email}> B6500000@g.sut.ac.th</Text>
      </View>
      <View style={styles.Title}>
        <Text style={styles.PageTitle}>setting</Text>
      </View>

      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.settingButton}>
          <Icon name="keypad-outline" size={40}  style={styles.settingicon} />  
          <Text style={styles.settingText}>    Pin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}onPress={handleResetPassword} >
        <Icons name="password" size={40}  style={styles.settingicon} />
          <Text style={styles.settingText}>    Change Password </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
        <Icon name="log-out-outline" size={40}  style={styles.settingicon} />
          <Text style={styles.settingText}>    Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton}>
        <Icons name="delete" size={40}  style={styles.settingicon} />
          <Text style={styles.settingText}>    Delete Account</Text>
        </TouchableOpacity>
      </View>

      <BottomBar navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

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
});
export default Setting;
