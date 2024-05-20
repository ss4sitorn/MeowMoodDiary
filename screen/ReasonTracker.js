import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Reason from "../util/Reason";
import BackButton from "../util/BackButton";
import {imageReasonStore} from "../util/image-store";


const ReasonTracker = ({route}) => {
    const navigation = useNavigation();
    const mood = route.params?.mood;
    const score = route.params?.score;
    console.log(mood);
    const handleBackPress = () => {
        navigation.goBack();
    };

    //map reason with reason img to object
    const reasonData = [
        { reasonText: "social"},
        { reasonText: "food"},
        { reasonText: "baby"},
        { reasonText: "work"},
        { reasonText: "health"},
        { reasonText: "school"},
        { reasonText: "money"},
        { reasonText: "love"},
        { reasonText: "home" },
        { reasonText: "friend"},
    ];


    const reasonrecord = (resson) => {
        // const mood = somethingIclicked;
        const reason = reasonData.find(reason => reason.reasonText === resson);
        var route_data = { mood: mood, reason: reason };
        if (score) {
            route_data.score = score;
        }
        navigation.navigate("CaptureThisDay", route_data);
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
                        imageSource={imageReasonStore['social']}
                        reasonText="social"
                        onPress={() => reasonrecord("social")}
                    />
                    <Reason
                        imageSource={imageReasonStore['food']}
                        reasonText="food"
                        onPress={() => reasonrecord("food")}
                    />
                    <Reason
                        imageSource={imageReasonStore['baby']}
                        reasonText="baby"
                        onPress={() => reasonrecord("baby")}
                    />
                </View>
                <View style={styles.row}>
                    <Reason
                        imageSource={imageReasonStore['work']}
                        reasonText="work"
                        onPress={() => reasonrecord("work")}
                    />
                    <Reason
                        imageSource={imageReasonStore['health']}
                        reasonText="health"
                        onPress={() => reasonrecord("health")}
                    />
                    <Reason
                        imageSource={imageReasonStore['school']}
                        reasonText="school"
                        onPress={() => reasonrecord("school")}
                    />
                </View>
                <View style={styles.row}>
                    <Reason
                        imageSource={imageReasonStore['money']}
                        reasonText="money"
                        onPress={() => reasonrecord("money")}
                    />
                    <Reason
                        imageSource={imageReasonStore['love']}
                        reasonText="love"
                        onPress={() => reasonrecord("love")}
                    />
                    <Reason
                        imageSource={imageReasonStore['home']}
                        reasonText="home"
                        onPress={() => reasonrecord("home")}
                    />
                </View>
                <View style={styles.row}>
                    <Reason
                        imageSource={imageReasonStore['friend']}
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
