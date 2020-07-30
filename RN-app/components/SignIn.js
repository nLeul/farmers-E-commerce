
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import StateContext from '../StateContext';


import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TextInput,
    Alert
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const SignIn = () => {

    const navigation = useNavigation();


  const [state, setState] = useState({
    email: 'leulnecha@gmail.com',
    password: '1234',

});

    const goToSignup = () => {
        navigation.navigate('SIGNUP')
}


    const {user,SignInHandler} = useContext(StateContext);

     const url = 'https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/signin';
 
    const goToFarmersList = async () => {
        try {
            const loginRes = await axios.post(url, state);
                SignInHandler(loginRes.data);
                navigation.navigate("TABS");
        } catch (error) {
            console.log(error);
        }
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
                        color="#1c8adb"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        value={state.email}
                    onChangeText={email => setState({...state,email:email})}
                    />

                    <Animatable.View animation="bounceIn">
                        <AntDesign name="checkcircle" size={20} color="#1c8adb" />
                    </Animatable.View>
                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>Password </Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" size={20} color="#1c8adb" />
                    <TextInput
                        placeholder="Enter Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={state.password}
                        onChangeText={password => setState({...state,password:password})}
                    />
                    <TouchableOpacity >
                        <Animatable.View animation="bounceIn">
                            <Entypo name="eye" size={20} color="#1c8adb" />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <LinearGradient  style={styles.signIn} colors={['#1c8adb', '#1c8adb']}>
                        <Text onPress={goToFarmersList} style={styles.textSign} >Sign In</Text>
                    </LinearGradient>
                </View>
                <View style={styles.button, { marginTop: 30 }}>

                    <TouchableOpacity style={[styles.signIn, styles.SignUp]}>
                        <Text onPress={goToSignup} style={styles.textSign} >Sign Up</Text>
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
        backgroundColor: '#1c8adb'
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
        color: '#1c8adb',
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
        color: '#1c8adb',
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
        backgroundColor: '#1c8adb',
        borderColor: '#1c8adb',
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