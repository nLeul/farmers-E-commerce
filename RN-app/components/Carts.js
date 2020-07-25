import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import Header from './Headers/Carts/Header';



const cart = {


    cart_items: [
        {
            prodId: 1,
            quantity: 2,
        }
    ],
    totalPrice: 4
}

const Carts = () => {
    const navigation = useNavigation();

    const [cart, setCart] = useState(null);

    // get cart and set to a variable
    useEffect(() => {
        const url = `https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/${customer_Id}`;
        axios.patch(url).then(cart => {
            const { data } = cart.data;
            setCart(data);
        });
    }, []);
    const pay = () => {
        alert("you have added i product")

    };
    const goToCart = () => {

        //  navigation.navigate('CART');
    };

    const { _id, index, cart_items, totalPrice } = cart;


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
                    <Text style={styles.faculty}>{_id}</Text>
                    <Text style={styles.faculty}>{totalPrice}</Text>
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
