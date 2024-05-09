import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BottomBar = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.tab, { width: 50, height: 50, borderRadius: 25 }]}
                onPress={() => navigation.navigate('Home')}>
                <MaterialCommunityIcons name="home" size={30} color="#63BFB2" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, { width: 50, height: 50, borderRadius: 25 }]}
                onPress={() => navigation.navigate('Analytics')}>
                <MaterialCommunityIcons name="chart-bar" size={30} color="#63BFB2" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, { width: 50, height: 50, borderRadius: 25}]}
                onPress={() => navigation.navigate('Notes')}>
                <MaterialCommunityIcons name="note-text" size={30} color="#63BFB2" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tab, { width: 50, height: 50, borderRadius: 25 }]}
                onPress={() => navigation.navigate('Settings')}>
                <MaterialCommunityIcons name="cog" size={30} color="#63BFB2" />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingTop: 10,
        borderRadius : 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BottomBar;