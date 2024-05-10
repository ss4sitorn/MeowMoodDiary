import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, SafeAreaView } from "react-native";
import { COLORS } from "../constants/colors";
import { useNavigation } from '@react-navigation/native';

const CardCreate = () => {
    const navigation = useNavigation();

    // State variables to hold default values for the card
    const [defaultIcon, setDefaultIcon] = useState(require("../assets/Flowers/f01.png"));
    const [defaultQuote, setDefaultQuote] = useState("Default Quote");
    const [defaultSignature, setDefaultSignature] = useState("Default Signature");
    const [defaultBgColor, setDefaultBgColor] = useState(COLORS.lightgreen);

    // State variables to hold user input for the card
    const [icon, setIcon] = useState(defaultIcon);
    const [quote, setQuote] = useState(defaultQuote);
    const [signature, setSignature] = useState(defaultSignature);
    const [bgColor, setBgColor] = useState(defaultBgColor);

    // List of available colors
    const colorList = [
        "#FFF8F8",
        "#ECDBC9",
        "#F898A4",
        "#ADD495",
        "#80B7A2",
        // Add more colors as needed
    ];

    // List of available flower icons
    const iconList = [
        require("../assets/Flowers/f01.png"),
        require("../assets/Flowers/f02.png"),
        require("../assets/Flowers/f03.png"),
        require("../assets/Flowers/f04.png"),
        // Add more icons as needed
    ];

    // Function to handle form submission and update the card
    const handleMood = () => {
        // Update default card information based on user input
        setDefaultIcon(icon);
        setDefaultQuote(quote);
        setDefaultSignature(signature);
        setDefaultBgColor(bgColor);
    };

    useEffect(() => {
        // Update default card information based on user input
        setDefaultIcon(icon);
        setDefaultQuote(quote);
        setDefaultSignature(signature);
        setDefaultBgColor(bgColor);
    }, [icon, quote, signature, bgColor]);

    // Function to handle color selection
    const handleColorSelection = (selectedColor) => {
        setBgColor(selectedColor);
    };

    // Function to handle icon selection
    const handleIconSelection = (selectedIcon) => {
        setIcon(selectedIcon);
    };

    // Function to render the circular background for the icon
    const renderIconBackground = () => (
        <View style={styles.iconBackground}>
            <Image source={defaultIcon} style={styles.icon} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Design your card</Text>
            </View>

            {/* Default card preview */}
            <View style={[styles.card, { backgroundColor: defaultBgColor }]}>
                {renderIconBackground()}
                <Text style={styles.text}>{defaultQuote}</Text>
                <Text style={styles.text}>{defaultSignature}</Text>
            </View>

            {/* Icon selection */}
            <View style={styles.selectionContainer}>
                <View style={styles.titleInputContainer}>
                    <Text style={styles.selectionTitle}>Select Icon:</Text>
                    <View style={styles.selection}>
                        {iconList.map((icon, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => handleIconSelection(icon)}
                            >
                                <Image source={icon} style={styles.thumbnail} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>

            {/* Color selection */}
            <View style={styles.selectionContainer}>
                <View style={styles.titleInputContainer}>
                    <Text style={styles.selectionTitle}>Select Color:</Text>
                    <View style={styles.colorSelection}>
                        {colorList.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.colorOption, { backgroundColor: color }]}
                                onPress={() => handleColorSelection(color)}
                            />
                        ))}
                    </View>
                </View>
            </View>

            {/* Quote input */}
            <View style={styles.inputContainer}>
                <View style={styles.titleInputContainer}>
                    <Text style={styles.inputTitle}>Quote:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Quote"
                        onChangeText={(text) => setQuote(text)}
                        value={quote}
                    />
                </View>
            </View>

            {/* Signature input */}
            <View style={styles.inputContainer}>
                <View style={styles.titleInputContainer}>
                    <Text style={styles.inputTitle}>Signature:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Signature"
                        onChangeText={(text) => setSignature(text)}
                        value={signature}
                    />
                </View>
            </View>

            {/* Mood button */}
            <TouchableOpacity style={styles.button} onPress={handleMood}>
                <Text style={styles.buttonText}>Mood Tag</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
    },
    header: {
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.darkgreen,
    },
    card: {
        width: "90%",
        height: "50%",
        backgroundColor: COLORS.pink,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.darkgreen,
    },
    iconBackground: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    icon: {
        width: 80,
        height: 80,
    },
    text: {
        marginBottom: 5,
    },
    selectionContainer: {
        marginBottom: 20,
        width: "90%",
    },
    titleInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginRight: 5,
        color: COLORS.darkgreen,
    },
    selection: {
        flexDirection: "row",
        marginBottom: 10,
    },
    option: {
        marginRight: 10,
        width: 50,
        height: 50,
        borderRadius: 5,
        borderColor: COLORS.black,
    },
    thumbnail: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
    },
    colorSelection: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    colorOption: {
        marginRight: 10,
        marginBottom: 10,
        width: 40,
        height: 20,
        borderRadius: 5,
        borderColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    inputContainer: {
        marginBottom: 20,
        width: "90%",
    },
    inputTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: COLORS.darkgreen,
    },
    input: {
        height: 30,
        width: "70%",
        borderWidth: 1,
        borderColor: COLORS.darkgreen,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: COLORS.white,
    },
    button: {
        backgroundColor: COLORS.purple,
        paddingVertical: 10,
        borderRadius: 5,
        width: "40%",
        alignItems: "center",
        alignSelf: "flex-end",
        marginTop: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
    },
});

export default CardCreate;
