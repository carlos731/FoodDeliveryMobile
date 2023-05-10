import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator } from 'react-native';
import { Colors, Images, Fonts } from '../constants';
import { Display } from '../utils';
import { Separator } from '../components';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Welcome');
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Colors.DEFAULT_GREEN}
                translucent
            />
            <Image
                source={Images.PLATE}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.titleText}>FoodDelivery</Text>

            <Separator height={Display.setHeight(10)} />

            <View style={styles.activityIndicator}>
                <ActivityIndicator
                    size={40}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.DEFAULT_GREEN,
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60),
    },
    titleText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: Fonts.POPPINS_LIGHT,
    },
});

export default SplashScreen;