import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import CardCreate from "./CardCreate";

// import styles from "../src/styles/styles";


const CardMood = () => {
    const navigation = useNavigation();

    // const handleBackPress = () => {
    //     navigation.navigate("CardCreate");
    //   };

        const handleMoodTag = () => {
      };

      const handleCardCreate = () => {
    };

    return (
        // JSX code
        <View style={styles.container} >
            {/* <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={handleBackPress}>
                <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            </View> */}
            <Text style={styles.header} >Add Mood to Your Card</Text>
            <View style={styles.tableContainer}>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                           <Image source={require("../assets/Emotion/e01.png")} style={{width: 135, height: 135}} />
                           <Text style={styles.Mood}>Disappointed</Text>
                        </TouchableOpacity>
                      
                    </View>
                    
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e02.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Shy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e03.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Confused</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e12.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Happy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e04.png")} style={{width: 135, height: 135}} />   
                        <Text style={styles.Mood}>Sad</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e06.png")} style={{width: 135, height: 135}} />    
                        <Text style={styles.Mood}>Silly</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e07.png")} style={{width: 135, height: 135}} />  
                        <Text style={styles.Mood}>Angry</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e13.png")} style={{width: 135, height: 135}} /> 
                        <Text style={styles.Mood}>Sleepy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e08.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Jealous</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e09.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Love</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e10.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Proud</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ handleMoodTag }>
                        <Image source={require("../assets/Emotion/e14.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Bored</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> 
            <TouchableOpacity style={styles.button} onPress={handleCardCreate}>
            <Text style={styles.buttonText}>Create Card</Text>
          </TouchableOpacity>
        </View>
    );  
    
   


 };


 const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "20%",
        backgroundColor: "cream",
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
    cellButton : {
        alignItems: "center",
        width: 135,
        height: 135,
        flexDirection: "column",
    },
    button: {
        backgroundColor: COLORS.pink,
        padding: 10,
        marginTop: 20, // Adjusted margin top
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
    buttonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: "bold",
    },
    tableContainer: {
        marginTop: 20, 
    },
 });

export default CardMood;