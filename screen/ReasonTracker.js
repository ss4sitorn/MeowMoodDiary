import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Reason from "../util/Reason";
import BackButton from "../util/BackButton";
 
const ReasonTracker = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate("MoodTracker");
    };

    const reasonrecord = () => {
        // const mood = somethingIclicked;
        navigation.navigate("CaptureThisDay");
    };

    return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton onPress={handleBackPress} />
      </View>
        <Text style={styles.header} >What is the reason ?</Text>
        <View style={styles.tableContainer}>
            <View style={styles.row}>
                <Reason imageSource={require("../assets/Stress reason icon/r01.png")} reasonText="social" onPress={reasonrecord} />          
                <Reason imageSource={require("../assets/Stress reason icon/r02.png")} reasonText="food" onPress={reasonrecord} />
                <Reason imageSource={require("../assets/Stress reason icon/r03.png")} reasonText="baby" onPress={reasonrecord} />
            </View>
            <View style={styles.row}>
                <Reason imageSource={require("../assets/Stress reason icon/r04.png")} reasonText="work" onPress={reasonrecord} />
                <Reason imageSource={require("../assets/Stress reason icon/r05.png")} reasonText="health" onPress={reasonrecord} />
                <Reason imageSource={require("../assets/Stress reason icon/r06.png")} reasonText="school" onPress={reasonrecord} />
            </View>
            <View style={styles.row}>
                <Reason imageSource={require("../assets/Stress reason icon/r07.png")} reasonText="money" onPress={reasonrecord} />
                <Reason imageSource={require("../assets/Stress reason icon/r08.png")} reasonText="love" onPress={reasonrecord} />
                <Reason imageSource={require("../assets/Stress reason icon/r09.png")} reasonText="home" onPress={reasonrecord} />
         
            </View>
            <View style={styles.row}>
                <Reason imageSource={require("../assets/Stress reason icon/r10.png")} reasonText="friend" onPress={reasonrecord} />
            </View>
        </View> 
        
    </View>
    );  

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "20%",
        backgroundColor: COLORS.cream,
      },
    header: {
        fontSize:   30, // 10% of screen width
        fontWeight: "bold",
        color: COLORS.darkgreen,
        textAlign: "center",

    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },

    backButtonContainer : {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 1,
      },
  
 });

export default ReasonTracker;