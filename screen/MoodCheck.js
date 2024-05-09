import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";

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
            <TouchableOpacity onPress={handleBackPress}>
                <Icon name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            </View>
            <Text style={styles.header} >How do you feel today ?</Text>
            <View style={styles.tableContainer}>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                           <Image source={require("../assets/Emotion/e01.png")} style={{width: 135, height: 135}} />
                           <Text style={styles.Mood}>Disappointed</Text>
                        </TouchableOpacity>
                      
                    </View>
                    
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking } >
                        <Image source={require("../assets/Emotion/e02.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Shy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e03.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Confused</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e12.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Happy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e04.png")} style={{width: 135, height: 135}} />   
                        <Text style={styles.Mood}>Sad</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e06.png")} style={{width: 135, height: 135}} />    
                        <Text style={styles.Mood}>Silly</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e07.png")} style={{width: 135, height: 135}} />  
                        <Text style={styles.Mood}>Angry</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e13.png")} style={{width: 135, height: 135}} /> 
                        <Text style={styles.Mood}>Sleepy</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e08.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Jealous</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e09.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Love</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e10.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Proud</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cell}>
                        <TouchableOpacity style={styles.cellButton} onPress={ Moodtracking }>
                        <Image source={require("../assets/Emotion/e14.png")} style={{width: 135, height: 135}} />
                        <Text style={styles.Mood}>Bored</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: "cream",
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
    cellButton : {
        alignItems: "center",
        width: 135,
        height: 135,
        flexDirection: "column",
    },
    backButtonContainer : {
        position: "absolute",
        top: 50,
        left: 20,
        zIndex: 1,
      },
  
 });


export default MoodCheck;