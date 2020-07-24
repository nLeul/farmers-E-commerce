import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';



import Home from 'components/Home';
import SignIn from 'components/SignIn';
import SignUp from 'components/Signup';
import FarmersList from 'components/FarmersList';
import Products from 'components/Products';
import Cart from 'components/Cart';
import EachProduct from 'components/EachProduct';
import Logout from 'components/Logout';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


function ProductStack() {
  return (
    <Stack.Navigator initialRouteName="ALL_FARMERS">
      <Stack.Screen name="ALL_FARMERS" component={FarmersList} />
      <Stack.Screen name="EACH_FARMERS_PRODUCT" component={EachProduct} />
    </Stack.Navigator>
  );
}
function TABS() {
  return (

    <Tab.Navigator initialRouteName={ProductStack}>
      <Tab.Screen name="FARMERS" component={ProductStack}  />
      <Tab.Screen name="PRODUCTS" component={Products} />
      <Tab.Screen name="CART" component={Cart} />
    </Tab.Navigator>

  );
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

