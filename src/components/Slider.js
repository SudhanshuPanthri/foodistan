import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const Slider = ({title, data, navigation}) => {
  const openItem = item => {
    navigation.navigate('ItemDetailScreen', item);
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.headingContainer}>
        <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.cardContainer}
              key={item.index}
              onPress={() => openItem(item)}>
              <View style={styles.ratingContainer}>
                <Text style={{color: '#fff', fontWeight: '600'}}>4.9</Text>
                <Text style={{color: '#fff', fontWeight: '600'}}>
                  240 reviews
                </Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 20,
                  top: 100,
                  padding: 10,
                  backgroundColor: '#937DC2',
                }}>
                <Text style={{color: '#fff'}}>{item.restaurantName}</Text>
              </View>
              <Image
                source={{uri: item.foodImageURL}}
                style={{height: '65%', width: '45%'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{marginVertical: 10, padding: 10}}>
                  <Text style={{color: '#000', fontWeight: '600'}}>
                    {item.foodName}
                  </Text>
                  <Text style={{color: '#000'}}>₹ {item.foodPrice}</Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 10,
                    // flexDirection: 'col',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#000'}}>{item.foodType}</Text>
                  <Image
                    source={
                      item.foodType === 'veg'
                        ? require('../assets/veg.png')
                        : require('../assets/non-veg.png')
                    }
                    style={{height: 20, width: 20, marginHorizontal: 10}}
                  />
                </View>
                {/*bad mein dekhenge buy ka option */}
                {/*<TouchableOpacity>*/}
                {/*  <Text>Buy</Text>*/}
                {/*</TouchableOpacity>*/}
              </View>
            </TouchableOpacity>
          )}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'column',
  },
  headingContainer: {
    padding: 10,
  },
  cardContainer: {
    // borderWidth: 2,
    // borderColor: '#06C167',
    borderRadius: 20,
    height: 200,
    // padding: 10,
    width: 300,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#FBF8F3',
  },
  ratingContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#06C167',
    padding: 10,
    zIndex: 20,
  },
});
