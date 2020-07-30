import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableHighlight, Alert,ScrollView } from 'react-native';
import Header from './Headers/Carts/Header';
import StateContext from '../StateContext';




const Carts = () => {
    const navigation = useNavigation();
    const { user } = useContext(StateContext);
    const customerId = user.user._id;



    const [cart, setCart] = useState({});

    // get cart and set to a variable
    useEffect(() => {
     
        const url = `https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/${customerId}`;
        (async () => {
            try {
                const user = await axios.get(url);
               const cartData = user.data.data.cart;
                 console.log({cartData})
                setCart(cartData);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [customerId]);
    
    console.log({cart});

    const pay = () => {
       Alert.alert("you have added 1 product")

    };
    const goToCart = () => {

        //  navigation.navigate('CART');
    };
  
        const { cart_items, totalQuantity, totalPrice } = cart;
    

 


    return (
        <View>

            <View>
                <Header />
            </View >
        <ScrollView

            style={styles.card}
        >

           
        <View >
                <View >
                     <FlatList
                        data={cart_items}
                        renderItem={({ item }) => (
                            <View>
                                <Text style={styles.name}>PRODUCT ID: Id {item.prodId.substring(17)}</Text>
                                <Text style={styles.name}  >QTY: {item.quantity}</Text>
                            </View>
                        )}
                    // keyExtractor={item => item._id}

                    /> 
                    <Text style={styles.name}>TOTAL PRICE-------------{totalPrice}</Text>
                    <Text style={styles.name} >TOTAL QTY------------{totalQuantity}</Text>
                </View> 
            
            </View> 
            <TouchableHighlight
                    onPress={goToCart}
                    style={styles.button}
                    underlayColor="#5398DC">
                    <Text style={styles.buttonText}>Pay</Text>
                </TouchableHighlight>
            </ScrollView>
            </View>


    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    stars: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        minWidth: 50,
    },
   name: {
        color: 'grey',
        padding:10
    },
    button: {
        marginTop:15,
        marginLeft:110,
        width:200,
        borderWidth: 1,
        borderColor: '#0066CC',
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: '#fff',
    },
    buttonText: {
        color: '#0066CC',
        fontSize: 40,
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
    card: {
        height: 400,
        // width:200,
        backgroundColor: "white",
        borderRadius: 16,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: "black",
        shadowOffset: {
          height: 0,
          width: 0,
        },
        elevation: 1,
      },
    
});



export default Carts;
