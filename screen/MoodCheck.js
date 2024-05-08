import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";

// import styles from "../src/styles/styles";


const MoodCheck = () => {
    const navigation = useNavigation();

    const Moodtracking = () => {
        // const mood = somethingIclicked;
        navigation.navigate('What is the reason ?');
    };

    // rest of the code

    return (
        // JSX code
        <View >

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
    row: {
        flexDirection: "row",
        justifyContent: "center",
    },
    cell: {
        marginTop : 17,
        marginLeft: 9,
        marginRight: 9,
    
    },
    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: COLORS.darkgreen,
        textAlign: "center",
        marginBottom: 20,
        marginTop: 15,
    },

    Mood: {
        fontSize: 18,
        color: COLORS.black,
        textAlign: "center",
        fontStyle: "italic",
    
    },

 });


export default MoodCheck;