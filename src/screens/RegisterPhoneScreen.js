import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Colors, Fonts, Images, CountryCode } from '../constants';
import { FlagItem, Separator, Togglebutton } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Display } from '../utils';

import { StaticImageService } from '../services';

const getDropDownStyle = (y) => ({...styles.countryDropdown, top: y + 60})

const RegisterPhoneScreen = () => {
    const [selectedCountry, setSelectedCountry] = useState(CountryCode.find(country => country.name === "Brazil"));
    const [inputsContainerY, setInputsContainerY] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState({});

    const closeDropdown = (pageX, pageY) => {
        if(isDropdownOpen) {
            if(
                pageX < dropdownLayout?.x ||
                pageX > dropdownLayout?.x + dropdownLayout?.width || pageY < dropdownLayout?.y ||
                pageY > dropdownLayout?.y + dropdownLayout?.height){
                setIsDropdownOpen(false);
            } 
        }
    }

    return (
        <View style={styles.container} onStartShouldSetResponder={({nativeEvent: {pageX, pageY}}) => closeDropdown(pageX, pageY)}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE}
                translucent
            />

            <Separator height={StatusBar.currentHeight} />

            <View style={styles.headerContainer}>
                <Ionicons
                    name="chevron-back-outline"
                    size={30}
                    onPress={() => navigation.goBack()}
                    color={Colors.DEFAULT_BLACK}
                />
                <Text style={styles.headerTitle}>Register Phone</Text>
            </View>

            <Text style={styles.title}>Register Phone</Text>
            <Text style={styles.content}>
                Enter your registered phone number to login.
            </Text>
            {/* Parte dos inputs */}
            <View style={styles.inputsContainer} onLayout={({ nativeEvent: {layout: {y} }}) => setInputsContainerY(y)}>
                <TouchableOpacity 
                    style={styles.countryListContainer} 
                    onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <Image
                        source={{ uri: StaticImageService.getFlagIcon(selectedCountry.code, 'FLAT', '32') }}
                        style={styles.flatIcon}
                    />
                    <Text style={styles.countryCodeText}>
                        {selectedCountry.dial_code}
                    </Text>
                    <MaterialIcons name="keyboard-arrow-down" size={18} color={Colors.DEFAULT_BLACK} />
                </TouchableOpacity>
                <View style={styles.phoneInputContainer}>
                    <TextInput
                        placeholder='Phone Number'
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        keyboardType='number-pad'
                        style={styles.inputText}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.signupButton}>
                <Text style={styles.signupButtonText}>Continue</Text>
            </TouchableOpacity>
            {/* Dropdown */}
            {isDropdownOpen && (
            <View style={getDropDownStyle(inputsContainerY)} onLayout={({nativeEvent: {layout: {x, y, height, width}}}) => setDropdownLayout({x, y, height, width})}>
                <FlatList 
                    data={CountryCode}
                    keyExtractor={(item) => item.code}
                    renderItem={({item}) => <FlagItem {...item} onPress={(country) => {
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                    }}/>}
                />
            </View>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
        color: Colors.DEFAULT_BLACK,
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
        color: Colors.DEFAULT_BLACK,
    },
    content: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        color: Colors.DEFAULT_BLACK,
    },
    inputsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 50,
    },
    countryListContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        width: Display.setWidth(22),
        marginRight: 10,
        borderRadius: 8,
        height: Display.setHeight(6),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        flexDirection: 'row',
    },
    phoneInputContainer: {
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: 'center',
        flex: 1,
        color: Colors.DARK_FIVE
    },
    flatIcon: {
        height: 20,
        width: 20,
    },
    countryCodeText: {
        fontSize: 14,
        lineHeight: 14 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    inputText: {
        fontSize: 18,
        textAlignVertical: 'center',
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK
    },
    countryDropdown: {
        backgroundColor: Colors.LIGHT_GREY,
        position: 'absolute',
        width: Display.setWidth(80),
        height: Display.setHeight(50),
        marginLeft: 20,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        zIndex: 3,
    },
    signupButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 20,
      },
      signupButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,
      },
});

export default RegisterPhoneScreen;