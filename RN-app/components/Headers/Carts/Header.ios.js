import React from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';

import HeaderStyle from 'styles/HeaderStyle';
import cartImage from 'images/cart.png';

const Header = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image source={cartImage} />
      </View>
      <Text style={HeaderStyle.ios}>Cart</Text>
    </SafeAreaView>
  )
};

export default Header;