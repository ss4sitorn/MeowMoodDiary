import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions  } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 
const ReasonTracker = () => {
    const navigation = useNavigation();

    const reasonrecord = () => {
        // const mood = somethingIclicked;
        // navigation.navigate("Reason");
    };

    return (
        <View >
        <Text style={styles.header} >What is the reason ?</Text>
        <View style={styles.tableContainer}>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton} onPress={ reasonrecord }>
                       <Image source={require("../assets/Stress reason icon/r01.png")} style={{width: 135, height: 135}} />
                       <Text style={styles.Mood}>social</Text>
                    </TouchableOpacity>
                  
                </View>
                
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton} onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r02.png")} style={{width: 135, height: 135}} />
                    <Text style={styles.Mood}>food</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton} onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r03.png")} style={{width: 135, height: 135}} />
                    <Text style={styles.Mood}>baby</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton}onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r04.png")} style={{width: 135, height: 135}} />
                    <Text style={styles.Mood}>excercies</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton} onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r05.png")} style={{width: 135, height: 135}} />   
                    <Text style={styles.Mood}>family</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton}onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r06.png")} style={{width: 135, height: 135}} />    
                    <Text style={styles.Mood}>work</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton} onPress={ reasonrecord }>
                    <Image source={require("../assets/Stress reason icon/r07.png")} style={{width: 135, height: 135}} />  
                    <Text style={styles.Mood}>money</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton} onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r08.png")} style={{width: 135, height: 135}} /> 
                    <Text style={styles.Mood}>love</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton}onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r09.png")} style={{width: 135, height: 135}} />
                    <Text style={styles.Mood}>home</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <TouchableOpacity style={styles.cellButton}onPress={ reasonrecord } >
                    <Image source={require("../assets/Stress reason icon/r10.png")} style={{width: 135, height: 135}} />
                    <Text style={styles.Mood}>Friend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View> 
        
    </View>
    );  

};
const styles = StyleSheet.create({
   
    header: {
        fontSize: windowWidth * 0.07, // 10% of screen width
        fontWeight: "bold",
        color: COLORS.darkgreen,
        textAlign: "center",
        // marginBottom: windowHeight * 0.02, // 2% of screen height
        marginTop: windowHeight * 0.01, // 2% of screen height
    },


    container: {
        flex: 1,
        padding : 20,
        backgroundColor: COLORS.white,
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
  
 });

export default ReasonTracker;