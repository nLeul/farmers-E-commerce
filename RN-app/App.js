import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';



import Home from 'components/Home';
import SignIn from 'components/SignIn';
import SignUp from 'components/Signup';
import FarmersList from 'components/FarmersList';
import Products from 'components/Products';
import Carts from 'components/Carts';
import EachProduct from 'components/EachProduct';
import Logout from 'components/Logout';
import AuthContext from './AuthContext';

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

    <Tab.Navigator initialRouteName={ProductStack}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'FARMERS') {
            return <Entypo name="grid" size={24} color="black" />
          } else if (route.name === 'PRODUCTS') {
            return <Fontisto name="product-hunt" size={24} color="black" />
          }
          else if (route.name === 'CART') {
            return <Entypo name="shopping-cart" size={24} color="black" />
          }else if (route.name === 'LOGOUT') {
            return <MaterialCommunityIcons name="logout" size={24} color="black" />
          }


        },
      })}

    >
      <Tab.Screen name="FARMERS" component={ProductStack} />
      <Tab.Screen name="PRODUCTS" component={Products} />
      <Tab.Screen name="CART" component={Carts} />
      <Tab.Screen name="LOGOUT" component={Logout}
      
      />
    </Tab.Navigator>

  );
}



export default function App() {
  return (
    <AuthContext.Provider value={{a:1}}>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="HOME" component={Home} options={{ title: "Home" }} />
        <Drawer.Screen name="SIGNIN" component={SignIn} options={{ title: "Sign In" }} />
        <Drawer.Screen name="SIGNUP" component={SignUp} options={{ title: "Register" }} />
        <Drawer.Screen name="TABS" component={TABS} options={{ title: "Products & Cart" }} />
      </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
      
  );
}

