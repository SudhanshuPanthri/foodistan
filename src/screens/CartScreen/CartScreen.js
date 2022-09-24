import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const CartScreen = ({navigation}) => {
  const [cartData, setCartData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartData = async () => {
    const docRef = await firebase
      .firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);

    docRef.get().then(doc => {
      if (doc.exists) {
        const data = JSON.stringify(doc.data());
        setCartData(data);
      }
    });
  };

  const deleteItem = item => {
    const docRef = firebase
      .firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);
    docRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(item),
    });
    getCartData();
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (cartData != null) {
      const food = JSON.parse(cartData).cart;
      let totalFoodPrice = 0;
      food.map(item => {
        totalFoodPrice +=
          item.data.foodPrice * item.foodQuantity +
          item.addOnQuantity * item.data.foodAddOnPrice;
      });
      setTotalPrice(totalFoodPrice);
    }
  }, [cartData]);

  return (
    <View style={styles.parent}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 10}}>
          <Image
            source={require('../../assets/back.png')}
            style={{height: 25, width: 25}}
          />
        </Pressable>
      </View>
      {cartData == null || JSON.parse(cartData).cart.length === 0 ? (
        <View style={{height: 450}}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
              Oh shit looks like your cart is empty :(
            </Text>
          </View>
          <Image
            source={require('../../assets/shopping.gif')}
            style={{height: '80%', width: '100%'}}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
              Your Cart
            </Text>
          </View>
          <View style={{padding: 10}}>
            <FlatList
              data={JSON.parse(cartData).cart}
              renderItem={({item}) => (
                <View style={styles.cartItem}>
                  <View style={{width: '60%'}}>
                    <View style={{height: '40%', padding: 10}}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        {item.data.foodName}
                      </Text>
                      <Text>{item.data.restaurantName}</Text>
                    </View>
                    {item.addOnQuantity > 0 && (
                      <View style={{height: '60%', padding: 10}}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            fontWeight: '500',
                          }}>
                          Food Quantity : {item.foodQuantity}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                            fontWeight: '500',
                          }}>
                          Addon Quantity : {item.addOnQuantity}
                        </Text>
                        <Text style={{fontSize: 16, color: '#000'}}>
                          (Rs. {item.data.foodAddOnPrice}/each)
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={{width: '40%'}}>
                    <Image
                      source={{uri: item.data.foodImageURL}}
                      style={{height: '100%', width: '100%'}}
                    />
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: 30,
                        width: 30,
                        backgroundColor: '#DAEAF1',
                      }}
                      onPress={() => deleteItem(item)}>
                      <Image
                        source={require('../../assets/delete.png')}
                        style={{height: '100%', width: '100%'}}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: '#06C167',
                        width: '100%',
                        padding: 10,
                      }}>
                      <Text style={{fontWeight: '600'}}>
                        Rs. {item.data.foodPrice}/each
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                width: '80%',
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 22, color: '#000', fontWeight: '600'}}>
                Total Price
              </Text>
              <Text style={{fontSize: 22, color: '#000', fontWeight: '600'}}>
                Rs. {totalPrice}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 160,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                marginVertical: 20,
                backgroundColor: '#06C167',
              }}
              onPress={() => {
                navigation.navigate('PlaceOrderScreen', {cartData});
              }}>
              <Text style={{fontWeight: '600', fontSize: 18}}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginVertical: 20,
    justifyContent: 'center',
  },
  cartItem: {
    marginVertical: 10,
    height: 140,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFE6E6',
  },
});

export default CartScreen;
