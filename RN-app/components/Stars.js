import React from 'react';

import { View, Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const Stars = ({ rating }) => {
  const stars = [...Array(rating)];

  return (

    <View style={{ flexDirection: 'row' }}>
      {stars.map((_, i) => {
        return <AntDesign key={i} name="star" size={12} color="#FFD64C" />
      })}
    </View>
  );
};

export default Stars