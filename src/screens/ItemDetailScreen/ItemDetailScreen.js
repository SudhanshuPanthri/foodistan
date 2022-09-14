import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

const ItemDetailScreen = ({navigation, route}) => {
  const data = route.params;
  if (route.params === undefined) {
    // ya toh ek 404 page not found wala page bhi bana sakta hai but wo bad mein dekhenge
    navigation.navigate('HomeScreen');
  }
  return (
    <View style={styles.parent}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 10}}>
          <Image
            source={require('../../assets/back.png')}
            style={{height: 25, width: 25}}
          />
        </Pressable>
        <Pressable>
          <Image
            source={require('../../assets/heart.png')}
            style={{height: 25, width: 25, marginHorizontal: 10}}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '600',
              color: '#000',
              padding: 10,
            }}>
            {data.foodName}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={{uri: data.foodImageURL}}
            style={{height: 300, width: '100%'}}
          />
        </View>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{width: '50%', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/plus.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
            <Text style={{marginVertical: 10, fontSize: 18}}>1</Text>
            <TouchableOpacity>
              <Image
                source={require('../../assets/minus.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '50%'}}>
            <Text style={{fontSize: 18, color: '#000'}}>
              {data.foodDescription}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemDetailScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  content: {
    // borderWidth: 1,
  },
});
