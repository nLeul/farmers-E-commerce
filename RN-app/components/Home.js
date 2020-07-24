import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, Dimensions, StyleSheet,TouchableOpacity } from 'react-native';


import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';


const Home = ({ navigation: { navigate } }) => {
    const goToSignIn = () => {
     navigate('SIGNIN')
    };
  
    const goToSignup = () => {
      navigate('SIGNUP')
  };


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duration={1500}
                    style={styles.logo}
                    // source={require('assets/icon.png')}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View
                style={styles.footer}
                animation="fadeInUpBig"
            >
                <Text style={styles.title}>Shop from a Farmer</Text>
                <Text style={styles.text}>Sign in with an Account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={goToSignIn}>
                        <LinearGradient
                            colors={['#3b5998', '#3b5998']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Sign In</Text>
                            <MaterialIcons
                                name="navigate-next"
                                size={24}
                                color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
          </View>
          <View style={styles.button}>
                    <TouchableOpacity onPress={goToSignup}>
                        <LinearGradient
                            colors={['#3b5998', '#3b5998']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Sign Up</Text>
                            <MaterialIcons
                                name="navigate-next"
                                size={24}
                                color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}
 
export default Home;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3b5998'
    },
    header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
    },
    logo: {
      width: height_logo,
      height: height_logo
    },
    title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
    },
    text: {
      color: 'grey',
      marginTop: 5
    },
    button: {
      alignItems: 'flex-end',
      marginTop: 30
    },
    signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      flexDirection: 'row'
    },
    textSign: {
      color: 'white',
      fontWeight: 'bold'
    }
  });