import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, Text } from 'react-native';

import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import FarmersList from './components/FarmersList';
import Products from './components/Products';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

function TABS() {
  return (

    <Tab.Navigator>
      <Tab.Screen name="FARMERS" component={FarmersList} />
      <Tab.Screen name="PRODUCTS" component={Products} />
      <Tab.Screen name="CART" component={Cart} />
    </Tab.Navigator>

  );
}


function Cart() {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="HOME" component={Home} options={{ title: "Home" }} />
        <Drawer.Screen name="SIGNIN" component={SignIn} options={{ title: "Sign In" }} />
        <Drawer.Screen name="SIGNUP" component={SignUp} options={{ title: "Register" }} />
        <Drawer.Screen name="TABS" component={TABS} options={{ title: "Products & Cart" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

