import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, SafeAreaView, StatusBar } from "react-native";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../util/BackButton";

const FavoriteCard = () => {
    const navigation = useNavigation();
    const handleBackPress = () => {
        navigation.goBack(); // navigate back to the previous screen
      };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <BackButton onPress={handleBackPress} />
                <Text style={styles.title}>Favorite Card</Text>
            </View>
            <View style={styles.card}></View>
        </SafeAreaView>
    );










};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cream,
        paddingTop: StatusBar.currentHeight,
        
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: 50,
        marginBottom: 10,
    },
    title : { 
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20,
    },
    



    
});

export default FavoriteCard;