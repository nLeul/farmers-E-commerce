import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { View,Text, Platform, SafeAreaView, FlatList,TouchableHighlight,StyleSheet } from 'react-native';
import Header from './Headers/Products/Header';
import Product from './Product';



const Products = ({ route: { params } }) => {
    const navigation = useNavigation();
    const goToCart = () => {//this is farmers_id---wrong
        // redirect to Cart where he can pay
        // http://localhost:3000/api/v1/users/5f0b7fc96d7acaf714688b2f/products/5f1b7602f80986000a49085f/cart/1
        navigation.navigate('CART');
    };

    const [products, setProducts] = useState([]);
    const { id } = params;
    // get products and set to a variable
    useEffect(() => {
        // const url = `http://localhost:3000/api/v1/users/products?farmerId=${id}`;
        // console.log(url);
        const productsurl = `https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/products?farmerId=${id}`
        axios.get(productsurl).then(products => {
            const { data } = products.data;
            setProducts(data);
        });
    }, []);

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
            <TouchableHighlight
                onPress={() => goToCart()}
                style={styles.button}
                underlayColor="#5398DC">
                <Text style={styles.buttonText}>Cart</Text>
            </TouchableHighlight>
            <FlatList
                data={products}
                renderItem={({ item }) => <Product
                    data={item}
                />}
                keyExtractor={item => item._id}

            />

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
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
    }
})
    


export default Products;