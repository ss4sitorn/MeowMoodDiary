import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
import BottomBar from "../util/BottomBar";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import Icon from 'react-native-vector-icons/AntDesign';


const CardToday = () => {
    const navigation = useNavigation();

    const handleAddCard = () => {
        navigation.navigate("CardCreate");
    };
    const handleFindCard = () => {

    };
    const handleFavCard = () => {

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Card of the Day</Text>
                {/* <Image source={require("")} style={styles.profile}/> */}
            </View>
            <View style={styles.card}></View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAddCard}>
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={handleFavCard}>
                    <Icon name="hearto" size={35} color={COLORS.pink} /> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleFindCard}>
                    <Text style={styles.buttonText}>Find New</Text>
                </TouchableOpacity>
            </View>
            <BottomBar navigation={navigation} />
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
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.darkgreen,
    },
    card: {
        width: 200,
        height: 200,
        backgroundColor: "lightblue",
        marginBottom: 20,
    },
    shakeText: {
        fontSize: 16,
        color: "gray",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%", // Adjusted width
        marginTop: 50,
        alignItems: "center",
    },
    button: {
        backgroundColor: COLORS.pink,
        padding: 10,
        borderRadius: 5,
        width: "30%", // Adjusted width
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: "2%", // Adjusted margin
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    }, 
    button2: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        width: 60, // Adjusted width to fit the icon
        height: 60, // Adjusted height to fit the icon
        marginHorizontal: 15, // Adjusted margin
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "bold",
    },
});


export default CardToday;
