import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
const ItemCard = ({
  OnPressItemCard,
  name,
  deliveryAvailable,
  discountAvailable,
  discountPercent,
  totalReviews,
  Address,
  farAway,
  averageRating,
  image,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.imgContainer}>
          <Image source={image} style={{height: 100, width: 100}} />
        </View>
        <View style={styles.ratingContainer}>
          <Text style={{color: '#fff', fontWeight: '600'}}>
            {averageRating}
          </Text>
          <Text style={{color: '#fff', fontWeight: '600'}}>
            {totalReviews} reviews
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.infoContainer}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
            {name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Image source={require('../assets/distance.png')} />
            <Text style={{marginHorizontal: 5}}>{farAway} min</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('../assets/address.png')}
            style={{height: 25, width: 25}}
          />
          <Text>{Address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#06C167',
    borderRadius: 20,
    height: 200,
    padding: 10,
    width: 280,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#FBF8F3',
  },
  upperContainer: {
    height: '60%',
    // borderWidth: 2,
  },
  bottomContainer: {
    height: '40%',
    // borderWidth: 2,
  },
  ratingContainer: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#06C167',
    padding: 10,
    borderRadius: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});
