import React from "react";
import { Text,  Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";



const BackButton = ({onPress}) =>{   
    return(
        <View >
        <TouchableOpacity onPress={onPress}>
            <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        </View>
    );
};


export default BackButton;