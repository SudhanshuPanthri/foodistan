import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const OrderPlacedScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontWeight: '600', fontSize: 24}}>
        Woo hoo! Order Placed
      </Text>
      <Image
        source={require('../../assets/delievery.gif')}
        style={{height: '70%', width: '70%'}}
      />
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderPlacedScreen;
