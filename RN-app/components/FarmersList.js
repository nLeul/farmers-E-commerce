import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Platform, SafeAreaView, FlatList } from 'react-native';
import Header from './Headers/Farmers/Header';
import Farmer from './Farmer';


const FarmersList = () => {

    const [farmers, setFarmers] = useState([]);
   
    // get farmers and set to a variable
    useEffect(() => {
        const url = 'http://localhost:3000/api/v1/users/farmers';
        // const url = 'https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/farmers';
        axios.get(url).then(farmers => {
            const { data } = farmers.data;
            setFarmers(data);
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
                data={farmers}
                renderItem={({ item }) => <Farmer
                    data={item}
                />}
                keyExtractor={item => item._id}

            />

        </SafeAreaView>
    );
}

export default FarmersList;