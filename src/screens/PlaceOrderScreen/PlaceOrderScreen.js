import React from 'react';
import {View, Text} from 'react-native';

const PlaceOrderScreen = ({navigation, route}) => {
  const {cartData} = route.params;

  return (
    <View>
      <Text>Place order screen</Text>
    </View>
  );
};

export default PlaceOrderScreen;
