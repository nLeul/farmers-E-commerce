import 'react-native-gesture-handler';
import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { View, Platform, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Header from './Headers/Farmers/Header';
import Farmer from './Farmer';
import StateContext from '../StateContext';


const FarmersList = () => {

    const { user } = useContext(StateContext);

    const [farmers, setFarmers] = useState([]);
   
    // get farmers and set to a variable
    useEffect(() => {
        const url = 'https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/farmers';
        axios.get(url).then(farmers => {
            const { data } = farmers.data;
            console.log("my data",data);
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
            </View >{farmers.length>0?
              (  <FlatList
                    data={farmers}
                    renderItem={({ item }) => <Farmer
                        data={item}
                    />}
                    keyExtractor={item => item._id}

                />):(<ActivityIndicator size="large"/>)}

        </SafeAreaView>
    );
}

export default FarmersList;