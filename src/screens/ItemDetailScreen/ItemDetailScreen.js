import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const ItemDetailScreen = ({navigation, route}) => {
  const [foodQuantity, setFoodQuantity] = useState('1');
  const [addOnQuantity, setAddOnQuantity] = useState('0');

  const data = route.params;
  if (route.params === undefined) {
    // ya toh ek 404 page not found wala page bhi bana sakta hai but wo bad mein dekhenge
    navigation.navigate('HomeScreen');
  }

  //addtocart function

  const addToCart = () => {
    const cartRef = firebase
      .firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);

    const cartData = {data, addOnQuantity, foodQuantity};
    cartRef.get().then(doc => {
      if (doc.exists) {
        cartRef.update({
          cart: firebase.firestore.FieldValue.arrayUnion(cartData),
        });
      } else {
        cartRef.set({
          cart: [cartData],
        });
        alert('Added to cart');
      }
    });
  };

  //increase quantity function
  const increaseQuantity = () => {
    setFoodQuantity((parseInt(foodQuantity) + 1).toString());
  };

  const increaseAddOnQuantity = () => {
    setAddOnQuantity((parseInt(addOnQuantity) + 1).toString());
  };

  //decrease quantity function
  const decreaseQuantity = () => {
    if (parseInt(foodQuantity) > 1) {
      setFoodQuantity((parseInt(foodQuantity) - 1).toString());
    }
  };

  const decreaseAddOnQuantity = () => {
    if (parseInt(addOnQuantity) > 0) {
      setAddOnQuantity((parseInt(addOnQuantity) - 1).toString());
    }
  };

  //function to calculate total price

  const totalPrice = () => {
    const price =
      parseInt(foodQuantity) * data.foodPrice +
      parseInt(addOnQuantity) * data.foodAddOnPrice;
    return price;
  };

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 10}}>
          <View style={{}}>
            <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
              {data.foodName}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: data.foodImageURL}}
              style={{height: 200, width: 200}}
            />
            <View
              style={{
                position: 'absolute',
                right: 0,
                padding: 15,
                backgroundColor: '#06C167',
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>
                ₹ {data.foodPrice}
              </Text>
            </View>
          </View>
          <View
            style={{
              // alignItems: 'center',
              height: 140,
              backgroundColor: '#FFE6E6',
              marginVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '20%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/restaurant.png')}
                  style={{height: 40, width: 40, marginLeft: 10}}
                />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#000',
                    marginHorizontal: 10,
                    fontWeight: '500',
                  }}>
                  {data.restaurantName}, {data.restaurantAddressStreet}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Image
                source={require('../../assets/info.png')}
                style={{width: 40, height: 40}}
              />
              <View>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#000'}}>
                  {data.restaurantEmail}
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                  {data.restaurantNumber}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
              backgroundColor: '#FFE6E6',
              marginVertical: 5,
            }}>
            <View
              style={{
                width: '20%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/category.png')}
                style={{height: 40, width: 40, marginLeft: 10}}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  marginHorizontal: 10,
                  textTransform: 'capitalize',
                }}>
                {data.foodCategory}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
              backgroundColor: '#FFE6E6',
              marginVertical: 5,
            }}>
            <View
              style={{
                width: '20%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={
                  data.foodType === 'veg'
                    ? require('../../assets/veg.png')
                    : require('../../assets/non-veg.png')
                }
                style={{height: 30, width: 30, marginHorizontal: 10}}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  marginHorizontal: 10,
                  textTransform: 'capitalize',
                }}>
                {data.foodType}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 120,
              backgroundColor: '#DAEAF1',
              padding: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#000',
                marginVertical: 5,
                fontWeight: '600',
              }}>
              About
            </Text>
            <Text style={{fontSize: 16, color: '#000'}}>
              {data.foodDescription}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 100,
              backgroundColor: '#FFE6E6',
              marginVertical: 5,
            }}>
            {data.foodAddOn ? (
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    marginLeft: 10,
                    color: '#000',
                  }}>
                  Add Extra
                </Text>
                <Text style={{marginLeft: 10, fontSize: 16}}>
                  {data.foodAddOn}
                </Text>
              </View>
            ) : (
              ''
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '50%',
              }}>
              <TouchableOpacity onPress={() => decreaseAddOnQuantity()}>
                <Image
                  source={require('../../assets/minus.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 22, fontWeight: '600'}}>
                {addOnQuantity}
              </Text>
              <TouchableOpacity onPress={() => increaseAddOnQuantity()}>
                <Image
                  source={require('../../assets/plus.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 100,
              backgroundColor: '#FFE6E6',
              marginVertical: 5,
            }}>
            <View style={{width: '50%'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  marginLeft: 10,
                  color: '#000',
                }}>
                Food Quantity
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '50%',
              }}>
              <TouchableOpacity onPress={() => decreaseQuantity()}>
                <Image
                  source={require('../../assets/minus.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 22, fontWeight: '600'}}>
                {foodQuantity}
              </Text>
              <TouchableOpacity onPress={() => increaseQuantity()}>
                <Image
                  source={require('../../assets/plus.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 100,
              backgroundColor: '#DAEAF1',
              marginVertical: 5,
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{fontSize: 20, color: '#000', fontWeight: '600'}}>
              Total Price
            </Text>
            <Text style={{fontSize: 20, color: '#000', fontWeight: '600'}}>
              Rs. {totalPrice()}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                padding: 10,
                height: 50,
                width: 150,
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#06C167',
              }}
              onPress={() => addToCart()}>
              <Text style={{fontSize: 18, fontWeight: '500', color: '#000'}}>
                Add to Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                padding: 10,
                height: 50,
                width: 150,
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#06C167',
              }}>
              <Text style={{fontSize: 18, fontWeight: '500', color: '#000'}}>
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
});
