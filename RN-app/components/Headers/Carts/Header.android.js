
import React from 'react';
import { Text, View, Image } from 'react-native';

import HeaderStyle from 'styles/HeaderStyle';
import CourseImage from 'images/cart.png';

const Header = () => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image source={CourseImage} />
      </View>
      <Text style={HeaderStyle.android}>Cart</Text>
    </View>
  )
};

export default Header;