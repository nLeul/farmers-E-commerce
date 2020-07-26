import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import Header from './Headers/Carts/Header';
import StateContext from '../StateContext';



const Carts = () => {
    const navigation = useNavigation();
    const { user } = useContext(StateContext);
    const customerId = user.user._id;



    const [cart, setCart] = useState({});

    // get cart and set to a variable
    useEffect(() => {
        const url = `http://localhost:3000/api/v1/users/${customerId}`;
        (async () => {
            try {
                const user = await axios.get(url);
                const cartData = user.data.data.cart;
                // console.log({cartData})
                setCart(cartData);
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);
    
    console.log({cart});

    const pay = () => {
        alert("you have added i product")

    };
    const goToCart = () => {

        //  navigation.navigate('CART');
    };
  
        const { cart_items, totalQuantity, totalPrice } = cart;
    

    // console.log(cart);


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                paddingTop: Platform.OS === 'android' ? 30 : 0,
                paddingBottom: 200
            }}>

            <View>
                <Header />
            </View >
        <View style={styles.row}>
                <Text>Cart</Text>
                <View style={styles.course}>
                     <FlatList
                        data={cart_items}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.lastname}>{item.prodId}</Text>
                                <Text style={styles.lastname}  >{item.quantity}</Text>
                            </View>
                        )}
                    // keyExtractor={item => item._id}

                    /> 
                    <Text style={styles.faculty}>{totalPrice}</Text>
                    <Text style={styles.faculty}>{totalQuantity}</Text>
                </View> 
            <View style={styles.edges}>
                <TouchableHighlight
                    onPress={pay}
                    style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Add2Order</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={goToCart}
                    style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Pay</Text>
                </TouchableHighlight>
            </View>
              </View> 
        </SafeAreaView>


    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 50,
    },
    stars: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        minWidth: 50,
    },
    course: {
        flexDirection: 'column',
        flex: 8,
    },
    lastname: {
        color: 'grey',
    },
    button: {
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 12,
        textAlign: 'center',
    },
    info: {
        marginHorizontal: 40,
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
});



export default Carts;
