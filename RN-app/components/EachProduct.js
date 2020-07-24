import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableHighlight, Platform, SafeAreaView, FlatList } from 'react-native';
import Stars from './Stars';
import Header from './Headers/Products/Header';
import Product from './Product';

const EachProduct = ({ route: { params } }) => {
    const [products, setProducts] = useState([]);
    // const id = { params };
    // get products and set to a variable
    useEffect(() => {

        setProducts([{
            num: 1,
            productName: "Banana",
            quantity: 6,
            productPrice: 3,
            productDescription: "Good Banan",
            productImage: "ahfskhas",
        },
        {
            num: 1,
            productName: "Banana",
            quantity: 6,
            productPrice: 3,
            productDescription: "Good Banan",
            productImage: "ahfskhas",
        }]);
        // const url = ' http://localhost:3000/api/v1/users/products';
        // console.log("products", products);

        // axios.get(url).then(products => {
        //     console.log("products");
        //     const { data } = products.data;
        //     console.log("prouct list", data)
        //     setProducts(data);
        // });
    }, []);
    // console.log("products", products)
    // const navigation = useNavigation();

    // const addToCart = () => {
    //     navigation.navigate('CART');
    // };

    // const { productName, quantity, productPrice, productDescription, productImage } = products;

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
            <FlatList
                data={products}
                renderItem={({ item }) => <Product
                    data={item}
                />}
                keyExtractor={item => item.num}

            />

        </SafeAreaView>
    )

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
    faculty: {
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


export default EachProduct;