
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';
import * as Location from 'expo-location'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TextInput
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const SignIn = ({ navigation }) => {

    const goToFarmersList = () => {
        navigation.navigate("TABS");
        // alert("Sign In");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-circle-o"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                    // onChangeText={email => emailHandler(email)}
                    />

                    <Animatable.View animation="bounceIn">
                        <AntDesign name="checkcircle" size={20} color="#05375a" />
                    </Animatable.View>
                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" size={20} color="#05375a" />
                    <TextInput
                        placeholder="Enter Password"
                        // secureTextEntry={secureTextEntry}
                        style={styles.textInput}
                        autoCapitalize="none"
                    // onChangeText={pass => passwordHandler(pass)}
                    />
                    <TouchableOpacity >
                        <Animatable.View animation="bounceIn">
                            <Entypo name="eye-with-line" size={20} color="#05375a" />
                            <Entypo name="eye" size={20} color="#05375a" />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <LinearGradient  style={styles.signIn} colors={['#3b5998', '#3b5998']}>
                        <Text onPress={goToFarmersList} style={styles.textSign} >Sign In</Text>
                    </LinearGradient>
                </View>
                <View style={styles.button, { marginTop: 30 }}>

                    <TouchableOpacity style={[styles.signIn, styles.SignUp]}>
                        <Text style={styles.textSign} >Sign Up</Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>
        </View>
    );
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b5998'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'

    },
    SignUp: {
        backgroundColor: '#3b5998',
        borderColor: '#3b5998',
        marginTop: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})