import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity,SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Mood from "../util/Mood";
import BackButton from "../util/BackButton";
import {imageMoodStore} from "../util/image-store";

// ...rest of the images
// import styles from "../src/styles/styles";


const MoodCheck = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        navigation.goBack();
    };

    //map mood and img mood to object
    const moodData = [
        { moodText: "Disappointed"},
        { moodText: "Shy"},
        { moodText: "Confused"},
        { moodText: "Happy"},
        { moodText: "Sad",},
        { moodText: "Silly"},
        { moodText: "Angry"},
        { moodText: "Sleepy"},
        { moodText: "Jealous"},
        { moodText: "Love"},
        { moodText: "Proud"},
        { moodText: "Bored"},
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
        <SafeAreaView style={styles.container} >
            <View style={styles.backButtonContainer}>
                <BackButton onPress={handleBackPress} />
            </View>
            <Text style={styles.header} >How do you feel today ?</Text>
            <View style={styles.tableContainer}>
                <View style={styles.row}>
                    <Mood imageSource={imageMoodStore['Disappointed']} moodText="Disappointed" onPress={() => Moodtracking("Disappointed")} />
                    <Mood imageSource={imageMoodStore['Shy']} moodText="Shy" onPress={() => Moodtracking("Shy")} />
                    <Mood imageSource={imageMoodStore['Confused']} moodText="Confused" onPress={() => Moodtracking("Confused")} />
                </View>
                <View style={styles.row}>
                    <Mood imageSource={imageMoodStore['Happy']} moodText="Happy" onPress={() => Moodtracking("Happy")} />
                    <Mood imageSource={imageMoodStore['Sad']} moodText="Sad" onPress={() => Moodtracking("Sad")} />
                    <Mood imageSource={imageMoodStore['Silly']} moodText="Silly" onPress={() => Moodtracking("Silly")} />
                </View>
                <View style={styles.row}>
                    <Mood imageSource={imageMoodStore['Angry']} moodText="Angry" onPress={() => Moodtracking("Angry")} />
                    <Mood imageSource={imageMoodStore['Sleepy']} moodText="Sleepy" onPress={() => Moodtracking("Sleepy")} />
                    <Mood imageSource={imageMoodStore['Jealous']} moodText="Jealous" onPress={() => Moodtracking("Jealous")} />
                </View>
                <View style={styles.row}>
                    <Mood imageSource={imageMoodStore['Love']} moodText="Love" onPress={() => Moodtracking("Love")} />
                    <Mood imageSource={imageMoodStore['Proud']} moodText="Proud" onPress={() => Moodtracking("Proud")} />
                    <Mood imageSource={imageMoodStore['Bored']} moodText="Bored" onPress={() => Moodtracking("Bored")} />
                </View>
            </View>

        </SafeAreaView>
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
