import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
    View,
    Text,
    StyleSheet,
    Image,
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


const SignUp = () => {
    const navigation = useNavigation();

    const [state, setState] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone_number: 0,

    });

    const { firstname, lastname, email, password, phone_number } = state;

    const goToSignup = async () => {
        try {
            const roleValue = { role: "customer" }
            let signUpValue = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                phone_number: Number(phone_number),
            }
            const data = { ...roleValue, ...signUpValue }

            let postedData = await axios.post(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/signup`, data);
            if (postedData.data.success) {
                navigation.navigate('TABS');
            }

        } catch (error) {
            Alert.alert("Error Occured")
        }



    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_footer}>First Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-circle-o"
                        color="#1c8adb"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter First Name"
                        style={styles.textInput}
                        value={state.firstname}
                        onChangeText={firstname => setState({ ...state, firstname: firstname })}
                    />
                    <Animatable.View animation="bounceIn">
                        <AntDesign name="checkcircle" size={20} color="#1c8adb" />
                    </Animatable.View>
                </View>
                <Text style={styles.text_footer}>Last Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-circle-o"
                        color="#1c8adb"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Last Name"
                        style={styles.textInput}
                        value={state.lastname}
                        onChangeText={lastname => setState({ ...state, lastname: lastname })}
                    />
                    <Animatable.View animation="bounceIn">
                        <AntDesign name="checkcircle" size={20} color="#1c8adb" />
                    </Animatable.View>
                </View>
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
                        value={state.email}
                        onChangeText={email => setState({ ...state, email: email })}
                    />
                    <Animatable.View animation="bounceIn">
                        <AntDesign name="checkcircle" size={20} color="#1c8adb" />
                    </Animatable.View>
                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>Phone Number</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-circle-o"
                        color="#1c8adb"
                        size={20}
                    />
                    <TextInput
                        placeholder="Enter Phone Number"
                        style={styles.textInput}
                        value={state.phone_number}
                        onChangeText={phone_number => setState({ ...state, phone_number: phone_number })}
                    />
                    <Animatable.View animation="bounceIn">
                        <AntDesign name="checkcircle" size={20} color="#1c8adb" />
                    </Animatable.View>
                </View>
                <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome name="lock" size={20} color="#1c8adb" />
                    <TextInput
                        placeholder="Enter Password"
                        style={styles.textInput}
                        value={state.password}
                        onChangeText={password => setState({ ...state, password: password })}

                    />
                    <TouchableOpacity >
                        <Animatable.View animation="bounceIn">
                            <Entypo name="eye" size={20} color="#1c8adb" />
                        </Animatable.View>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <LinearGradient style={styles.signIn} colors={['#1c8adb', '#1c8adb']}>
                        <Text onPress={goToSignup} style={styles.textSign}>Sign Up</Text>
                    </LinearGradient>
                </View>
                <View style={styles.button, { marginTop: 30 }}>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.signIn, styles.SignUp]}>
                        <Text style={styles.textSign} >Go Back</Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>
        </View>
    );
}

export default SignUp;

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
        borderColor: '#3b5998',
        marginTop: 15
    }
});