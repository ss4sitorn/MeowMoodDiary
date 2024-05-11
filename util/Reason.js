import React from "react";
import { Text,  Image, TouchableOpacity, View } from "react-native";


const Reason = ({imageSource, reasonText ,onPress}) =>{
    return(
        <View style={styles.cell}>
        <TouchableOpacity style={styles.Reasonbutton} onPress={onPress}>
            <Image source={imageSource} style={{width: 135, height: 135}} />
            <Text>{reasonText}</Text>
        </TouchableOpacity>    
        </View>
    );
};
const styles = { 
    Reasonbutton : {
        alignItems: "center",
        width: 135,
        height: 135,
        flexDirection: "column",
        
    },

};
export default Reason;