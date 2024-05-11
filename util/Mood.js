import React from "react";
import { Text,  Image, TouchableOpacity, View } from "react-native";


const Mood = ({imageSource, moodText ,onPress}) =>{
    return(
        <View style={styles.cell}>
        <TouchableOpacity style={styles.Moodbutton} onPress={onPress}>
            <Image source={imageSource} style={{width: 135, height: 135}} />
            <Text>{moodText}</Text>
        </TouchableOpacity>    
        </View>
    );
};
const styles = { 
    Moodbutton : {
        alignItems: "center",
        width: 135,
        height: 135,
        flexDirection: "column",
        
    },

};
export default Mood;