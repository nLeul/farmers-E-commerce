import React from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';

import HeaderStyle from 'styles/HeaderStyle';
import CourseImage from 'images/cart.png';

const Header = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Image source={CourseImage} />
      </View>
      <Text style={HeaderStyle.ios}>Cart</Text>
    </SafeAreaView>
  )
};

export default Header;