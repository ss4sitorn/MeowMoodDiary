import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from "react-native";
import BottomBar from "../util/BottomBar"; // Import your BottomBar component
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";

const CardOTD = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Card of the Day</Text>
                {/* <Image source={require("")} style={styles.profile}/> */}
            </View>
            <View style={styles.card}>

            </View>
            <Text style={styles.shakeText}>Shake your phone to shuffle the card deck. </Text>

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
});

export default CardOTD;