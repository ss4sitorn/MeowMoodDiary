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

    //map mood and img mood to object
    const moodData = [
        { moodText: "Disappointed", imageSource: require("../assets/Emotion/e01.png") },
        { moodText: "Shy", imageSource: require("../assets/Emotion/e02.png") },
        { moodText: "Confused", imageSource: require("../assets/Emotion/e03.png") },
        { moodText: "Happy", imageSource: require("../assets/Emotion/e12.png") },
        { moodText: "Sad", imageSource: require("../assets/Emotion/e04.png"), navigation_to:'Assessment' },
        { moodText: "Silly", imageSource: require("../assets/Emotion/e06.png") },
        { moodText: "Angry", imageSource: require("../assets/Emotion/e07.png") },
        { moodText: "Sleepy", imageSource: require("../assets/Emotion/e13.png") },
        { moodText: "Jealous", imageSource: require("../assets/Emotion/e08.png") },
        { moodText: "Love", imageSource: require("../assets/Emotion/e09.png") },
        { moodText: "Proud", imageSource: require("../assets/Emotion/e10.png") },
        { moodText: "Bored", imageSource: require("../assets/Emotion/e14.png") },
    ];
    const Moodtracking = (moodText) => {
        // const mood = somethingIclicked;
        const mood = moodData.find(mood => mood.moodText === moodText);
        if (mood.navigation_to) {
            navigation.navigate(mood.navigation_to, {mood: mood});
            return;
        }
        navigation.navigate('Reason', {mood: mood});
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
                    <Mood imageSource={require("../assets/Emotion/e01.png")} moodText="Disappointed" onPress={() => Moodtracking("Disappointed")} />
                    <Mood imageSource={require("../assets/Emotion/e02.png")} moodText="Shy" onPress={() => Moodtracking("Shy")} />
                    <Mood imageSource={require("../assets/Emotion/e03.png")} moodText="Confused" onPress={() => Moodtracking("Confused")} />
                </View>
                <View style={styles.row}>
                    <Mood imageSource={require("../assets/Emotion/e12.png")} moodText="Happy" onPress={() => Moodtracking("Happy")} />
                    <Mood imageSource={require("../assets/Emotion/e04.png")} moodText="Sad" onPress={() => Moodtracking("Sad")} />
                    <Mood imageSource={require("../assets/Emotion/e06.png")} moodText="Silly" onPress={() => Moodtracking("Silly")} />
                </View>
                <View style={styles.row}>
                    <Mood imageSource={require("../assets/Emotion/e07.png")} moodText="Angry" onPress={() => Moodtracking("Angry")} />
                    <Mood imageSource={require("../assets/Emotion/e13.png")} moodText="Sleepy" onPress={() => Moodtracking("Sleepy")} />
                    <Mood imageSource={require("../assets/Emotion/e08.png")} moodText="Jealous" onPress={() => Moodtracking("Jealous")} />
                </View>
                <View style={styles.row}>
                    <Mood imageSource={require("../assets/Emotion/e09.png")} moodText="Love" onPress={() => Moodtracking("Love")} />
                    <Mood imageSource={require("../assets/Emotion/e10.png")} moodText="Proud" onPress={() => Moodtracking("Proud")} />
                    <Mood imageSource={require("../assets/Emotion/e14.png")} moodText="Bored" onPress={() => Moodtracking("Bored")} />
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
        fontSize: 30, // 10% of screen width
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
    backButtonContainer: {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 1,
    },

});


export default MoodCheck;