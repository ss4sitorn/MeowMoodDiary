import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Reason from "../util/Reason";
import BackButton from "../util/BackButton";
 
const ReasonTracker = ({route}) => { 
    const navigation = useNavigation();
    const { mood } = route.params;
    console.log(mood);

    const handleBackPress = () => {
        navigation.navigate("MoodTracker");
    };

    //map reason with reason img to object
    const reasonData = [
        { reasonText: "social", imageSource: require("../assets/Stress reason icon/r01.png") },
        { reasonText: "food", imageSource: require("../assets/Stress reason icon/r02.png") },
        { reasonText: "baby", imageSource: require("../assets/Stress reason icon/r03.png") },
        { reasonText: "work", imageSource: require("../assets/Stress reason icon/r04.png") },
        { reasonText: "health", imageSource: require("../assets/Stress reason icon/r05.png") },
        { reasonText: "school", imageSource: require("../assets/Stress reason icon/r06.png") },
        { reasonText: "money", imageSource: require("../assets/Stress reason icon/r07.png") },
        { reasonText: "love", imageSource: require("../assets/Stress reason icon/r08.png") },
        { reasonText: "home", imageSource: require("../assets/Stress reason icon/r09.png") },
        { reasonText: "friend", imageSource: require("../assets/Stress reason icon/r10.png") },
    ];


    const reasonrecord = (resson) => {
        // const mood = somethingIclicked;
        const reason = reasonData.find(reason => reason.reasonText === resson);
        console.log(reason);
        navigation.navigate("CaptureThisDay", { reason: reason , mood: mood });
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButtonContainer}>
                <BackButton onPress={handleBackPress} />
            </View>
            <Text style={styles.header}>What is the reason ?</Text>
            <View style={styles.tableContainer}>
                <View style={styles.row}>
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r01.png")}
                        reasonText="social"
                        onPress={() => reasonrecord("social")}
                    />
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r02.png")}
                        reasonText="food"
                        onPress={() => reasonrecord("food")}
                    />
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r03.png")}
                        reasonText="baby"
                        onPress={() => reasonrecord("baby")}
                    />
                </View>
                <View style={styles.row}>
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r04.png")}
                        reasonText="work"
                        onPress={() => reasonrecord("work")}
                    />
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r05.png")}
                        reasonText="health"
                        onPress={() => reasonrecord("health")}
                    />
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r06.png")}
                        reasonText="school"
                        onPress={() => reasonrecord("school")}
                    />
                </View>
                <View style={styles.row}>
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r07.png")}
                        reasonText="money"
                        onPress={() => reasonrecord("money")}
                    />
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r08.png")}
                        reasonText="love"
                        onPress={() => reasonrecord("love")}
                    />
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r09.png")}
                        reasonText="home"
                        onPress={() => reasonrecord("home")}
                    />
                </View>
                <View style={styles.row}>
                    <Reason
                        imageSource={require("../assets/Stress reason icon/r10.png")}
                        reasonText="friend"
                        onPress={() => reasonrecord("friend")}
                    />
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