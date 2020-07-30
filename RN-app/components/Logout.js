import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Alert, Modal, StyleSheet, TouchableHighlight, Button } from 'react-native';
const Logout = () => {

    const navigation = useNavigation();

    const backToLogin = () => {
        navigation.navigate('HOME');
    }
    const backToFarmersList = () => {
        navigation.navigate('FARMERS');
    }
    return (
        <View style={styles.text}>
            <Text style={styles.question}>Are you sure you want to Log Out?</Text>
            <Button onPress={backToLogin} title="Yes"></Button>
            <Button onPress={backToFarmersList} title="Keep Shopping"></Button>
        </View>
    );
}

export default Logout;

const styles = StyleSheet.create({
    text: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    question: {
        textAlign: "center"
    }
});
