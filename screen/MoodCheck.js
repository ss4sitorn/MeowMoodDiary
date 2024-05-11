import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Mood from "../util/Mood";
import BackButton from "../util/BackButton";
// import styles from "../src/styles/styles";


const MoodCheck = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.navigate("Home");
      };

    const Moodtracking = () => {
        // const mood = somethingIclicked;
        navigation.navigate('Reason');
    };

    // rest of the code

    return (
        // JSX code
        <View style={styles.container} >
            <View style={styles.backButtonContainer}>
                <BackButton onPress={handleBackPress} />
            </View>
            <Text style={styles.header} >How do you feel today ?</Text>
            <View style={styles.tableContainer}>
                <View style={styles.row}>
                <Mood imageSource={require("../assets/Emotion/e01.png")} moodText="Disappointed" onPress={Moodtracking} />                    
                <Mood imageSource={require("../assets/Emotion/e02.png")} moodText="Shy" onPress={Moodtracking} />
                <Mood imageSource={require("../assets/Emotion/e03.png")} moodText="Confused" onPress={Moodtracking} />
                </View>
                <View style={styles.row}>
                <Mood imageSource={require("../assets/Emotion/e12.png")} moodText="Happy" onPress={Moodtracking} />
                <Mood imageSource={require("../assets/Emotion/e04.png")} moodText="Sad" onPress={Moodtracking} />     
                <Mood imageSource={require("../assets/Emotion/e06.png")} moodText="Silly" onPress={Moodtracking} />
                </View>
                <View style={styles.row}>
                <Mood imageSource={require("../assets/Emotion/e07.png")} moodText="Angry" onPress={Moodtracking} />
                <Mood imageSource={require("../assets/Emotion/e13.png")} moodText="Sleepy" onPress={Moodtracking} />
                <Mood imageSource={require("../assets/Emotion/e08.png")} moodText="Jealous" onPress={Moodtracking} />    
                </View>
                <View style={styles.row}>
                <Mood imageSource={require("../assets/Emotion/e09.png")} moodText="Love" onPress={Moodtracking} />
                <Mood imageSource={require("../assets/Emotion/e10.png")} moodText="Proud" onPress={Moodtracking} />
                <Mood imageSource={require("../assets/Emotion/e14.png")} moodText="Bored" onPress={Moodtracking} />
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
        // marginBottom: windowHeight * 0.02, // 2% of screen height
        // marginTop: windowHeight * 0.01, // 2% of screen height
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },
    // Moodbutton : {
    //     alignItems: "center",
    //     width: 135,
    //     height: 135,
    //     flexDirection: "column",
    // },
    backButtonContainer : {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 1,
      },
  
 });


export default MoodCheck;