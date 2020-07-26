import 'react-native-gesture-handler';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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
import Logout from 'components/Logout';
import StateContext from './StateContext';

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


function TABS() {
  return (

    <Tab.Navigator initialRouteName={FarmersList}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'FARMERS') {
            return <Entypo name="grid" size={24} color="black" />
          } else if (route.name === 'PRODUCTS') {
            return <Fontisto name="product-hunt" size={24} color="black" />
          }
          else if (route.name === 'CART') {
            return <Entypo name="shopping-cart" size={24} color="black" />
          } else if (route.name === 'LOGOUT') {
            return <MaterialCommunityIcons name="logout" size={24} color="black" />
          }


        },
      })}

    >
      <Tab.Screen name="FARMERS" component={FarmersList} />
      <Tab.Screen name="PRODUCTS" component={Products} />
      <Tab.Screen name="CART" component={Carts} />
      <Tab.Screen name="LOGOUT" component={Logout}

      />
    </Tab.Navigator>

  );
}



export default function App() {

  const [user, setUser] = useState(null);

  const url = 'http://localhost:3000/api/v1/users/signin';

  const SignInHandler = async () => {
    try {


      const loginRes = await axios.post(url, {
        "email": "lnecha@mum.edu",
        "password": "1234"

      });
      let userState = loginRes.data.success
      if (userState) {
        setUser(loginRes.data)
        await AsyncStorage.setItem("user", JSON.stringify(loginRes.data));
        return true;
      } else {
        return false;
      }

    }
    catch (err) {

      // Alert.alert(err.message)
      return false
    }

  }


  useEffect(() => {
    (async () => {
      const storedUser = await AsyncStorage.getItem("user");

      setUser(JSON.parse(storedUser));
    })();

  }, []);
  return (
    <StateContext.Provider value={{ user, SignInHandler }}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="HOME" component={Home} options={{ title: "Home" }} />
          <Drawer.Screen name="SIGNIN" component={SignIn} options={{ title: "Sign In" }} />
          <Drawer.Screen name="SIGNUP" component={SignUp} options={{ title: "Register" }} />
          <Drawer.Screen name="TABS" component={TABS} options={{ title: "Products & Cart" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StateContext.Provider>

  );
}

