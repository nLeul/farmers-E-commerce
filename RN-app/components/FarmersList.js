import 'react-native-gesture-handler';
import React,{useState} from 'react';
import axios from 'axios';
import { View, Platform, SafeAreaView, FlatList } from 'react-native';
import Header from './Header';
import Farmer from './Farmer';


const data = [
    { title: 'Web Application Programming', faculty: 'Asaad Saad', code: 'CS472', rating: 4 },
    { title: 'Modern Web Application', faculty: 'Asaad Saad', code: 'CS572', rating: 5 },
    { title: 'Enterprise Architecture', faculty: 'Joe Bruen', code: 'CS557', rating: 4 },
    { title: 'Algorithms', faculty: 'Clyde Ruby', code: 'CS421', rating: 5 },
    { title: 'Object Oriented JavaScript', faculty: 'Keith Levi', code: 'CS372', rating: 3 },
    { title: 'Big Data', faculty: 'Prem Nair', code: 'CS371', rating: 5 },
    { title: 'Web Application Architecture', faculty: 'Rakesh Shrestha', code: 'CS377', rating: 5 },
    { title: 'Big Data Analytics', faculty: 'Mrudula Mukadam', code: 'CS378', rating: 5 },
];

const FarmersList = () => {
    const [value, setData] = useState({
        firstname: "",
        lastname: "",
        phone_number: 0,
    });
    // get farmers and set to a variable
    const url = 'http://localhost:3000/api/v1/users/farmers';
    const getFarmers = async () => {
        const farmers = await axios.get(url);
        const value = farmers.data;
        setData({
            firstname: value.firstname,
            lastname: value.lastname,
            phone_number:value.phone_number,
        })
    }
    getFarmers();

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
                data={data}
                renderItem={({ item }) => <Farmer
                    data={item}
                />}
                keyExtractor={item => item.code}

            />

        </SafeAreaView>
    );
}

export default FarmersList;