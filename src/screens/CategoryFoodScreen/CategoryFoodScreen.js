import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';

const CategoryFoodScreen = ({navigation, route}) => {
  const [foodData, setFoodData] = useState(null);
  const data = route.params;
  if (route.params === undefined) {
    navigation.navigate('HomeScreen');
  }

  const getData = async () => {
    const foodRef = await firebase
      .firestore()
      .collection('FoodData')
      .where('foodCategory', '==', data);
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.parent}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 40,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
            style={{height: 25, width: 25}}
          />
        </Pressable>
        <Text
          style={{
            textTransform: 'uppercase',
            fontSize: 22,
            fontWeight: '600',
            color: '#000',
            marginLeft: 20,
          }}>
          {data}
        </Text>
      </View>
      <FlatList
        data={foodData}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => {
              navigation.navigate('ItemDetailScreen', item);
            }}>
            <View
              style={{
                width: '60%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginLeft: 20,
                  fontWeight: '500',
                  fontSize: 16,
                  color: '#000',
                }}>
                {item.foodName}
              </Text>
              <Text
                style={{
                  marginLeft: 20,
                  fontWeight: '500',
                  fontSize: 16,
                  color: '#000',
                }}>
                {item.restaurantName}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  backgroundColor: 'red',
                  height: 25,
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff'}}>Best Seller</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  marginBottom: 10,
                }}>
                <Image
                  source={
                    item.foodType === 'veg'
                      ? require('../../assets/veg.png')
                      : require('../../assets/non-veg.png')
                  }
                  style={{height: 20, width: 20, marginHorizontal: 10}}
                />
              </View>
            </View>
            <View
              style={{
                width: '40%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: item.foodImageURL}}
                style={{height: '80%', width: '85%'}}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  zIndex: 20,
                  backgroundColor: '#06C167',
                  width: '100%',
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#fff', fontWeight: '500', fontSize: 16}}>
                  Rated 4.9
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoryFoodScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  cardContainer: {
    height: 140,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DAEAF1',
  },
});
