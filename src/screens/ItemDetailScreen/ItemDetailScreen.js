import React from 'react';
import {View, Text} from 'react-native';

const ItemDetailScreen = ({navigation, route}) => {
  const data = route.params;
  if (route.params === undefined) {
    // ya toh ek 404 page not found wala page bhi bana sakta hai but wo bad mein dekhenge
    navigation.navigate('HomeScreen');
  }
  return (
    <View>
      <Text>{data.foodName}</Text>
    </View>
  );
};

export default ItemDetailScreen;
