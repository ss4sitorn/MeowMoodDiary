import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('')}>
        <Icon name="calendar" size={35} color={COLORS.darkgreen} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('')}>
        <Icons name="cards-playing" size={35} color={COLORS.darkgreen} />
      </TouchableOpacity>
      <View style={styles.middleIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MoodTracker')}>
        <Image source={require("../assets/Emotion/e12.png")} style={{width: 80, height: 140}} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('')}>
        <Icon name="pie-chart-sharp" size={35} color={COLORS.darkgreen} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('')}>
        <Icon name="settings" size={35} color={COLORS.darkgreen} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: 60,
        width: '100%',
        paddingHorizontal: 20,
        borderTopWidth: 0.5,
        borderTopRadius: 30,
        borderTopColor: COLORS.darkgreen,
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
        width: '100%',
        position: 'absolute', 
        bottom: 0, 
    },
    middleIconContainer: {
      position: 'center',
      top: -10, // Adjust as needed to position the icon outside the container
      alignItems: 'center',
    },
});

export default BottomNavBar;
