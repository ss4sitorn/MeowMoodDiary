import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import { Accelerometer } from 'expo-sensors';

const CardOTD = () => {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
    const [shakeDetected, setShakeDetected] = useState(false);

    useEffect(() => {
        const subscribe = async () => {
            // Request permission to access the accelerometer
            const { status } = await Accelerometer.requestPermissionsAsync();
            //console.log('Permission status:', status);a
            setHasPermission(status === 'granted');

            if (status === 'granted') {
                // Set up accelerometer listener
                console.log('Permission granted. Setting up listener...');
                setSubscription(
                    Accelerometer.addListener(sensorData => {
                        //console.log('Sensor Data:', sensorData);
                        setAccelData(sensorData);
                    })
                );
                Accelerometer.setUpdateInterval(100); // Set the update interval to 100ms
            } else {
                console.log('Permission denied.');
            }
        };

        subscribe();

        return () => {
            console.log('Unsubscribing from accelerometer...');
            subscription && subscription.remove();
            setSubscription(null);
        };
    }, []);

    useEffect(() => {
        if (hasPermission) {
            const isShaking = () => {
                const threshold = 1.5; // Lowered threshold to make shaking condition easier
                const totalAcceleration = Math.sqrt(
                    accelData.x * accelData.x +
                    accelData.y * accelData.y +
                    accelData.z * accelData.z
                );
            
                return totalAcceleration > threshold;
            };

            if (isShaking()) {
                console.log('Shake detected!'); // Logging shake detection
                setShakeDetected(true);
            }
        }
    }, [accelData, hasPermission]);

    useEffect(() => {
        if (shakeDetected) {
            console.log('Navigating to CardToday'); // Logging navigation
            navigation.navigate('CardToday');
            setShakeDetected(false); // Reset shake detection after navigation
        }
    }, [shakeDetected, navigation]);

    useEffect(() => {
        // Reset shake detection when component unmounts
        return () => setShakeDetected(false);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Card of the Day</Text>
            </View>
            <View style={styles.card}></View>
            <Text style={styles.shakeText}>
                Shake your phone
            </Text>
          <View style={styles.sensorData}>
                <Text>X: {accelData.x.toFixed(2)}</Text>
                <Text>Y: {accelData.y.toFixed(2)}</Text>
                <Text>Z: {accelData.z.toFixed(2)}</Text>
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
        backgroundColor: COLORS.cream,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.darkgreen,
    },
    card: {
        width: 200,
        height: 200,
        backgroundColor: "lightblue",
        marginBottom: 20,
    },
    shakeText: {
        fontSize: 16,
        color: "gray",
    },
    sensorData: {
        marginTop: 20,
    },
});

export default CardOTD;
