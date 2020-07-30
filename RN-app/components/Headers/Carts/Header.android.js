
import React from 'react';
import { Text, View, Image } from 'react-native';

import HeaderStyle from 'styles/HeaderStyle';
import cartImage from 'images/cart.png';

const Header = () => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image source={cartImage} />
      </View>
      <Text style={HeaderStyle.android}>Cart</Text>
    </View>
  )
};

export default Header;