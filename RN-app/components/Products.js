import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Platform, SafeAreaView, FlatList } from 'react-native';
import Header from './Headers/Products/Header';
import Product from './Product';



const Products = ({ route: { params } }) => {

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

export default Products;