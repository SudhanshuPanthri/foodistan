import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, FlatList} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const CartScreen = ({navigation}) => {
  const [cartData, setCartData] = useState(null);
  const [totalPrice, setTotalPrice] = useState('0');

  const getCartData = () => {
    const docRef = firebase
      .firestore()
      .collection('UserCart')
      .doc(auth().currentUser.uid);

    docRef.get().then(doc => {
      if (doc.exists) {
        const data = JSON.stringify(doc.data());
        setCartData(data);
      } else {
      }
    });
  };

  useEffect(() => {
    getCartData();
  }, []);

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
        <View>
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
                    </View>
                    {item.addOnQuantity > 0 && (
                      <View style={{borderWidth: 1, height: '60%'}}>
                        <Text>{item.foodQuantity}</Text>
                        <Text>{item.addOnQuantity}</Text>
                      </View>
                    )}
                  </View>
                  <View style={{width: '40%'}}>
                    <Image
                      source={{uri: item.data.foodImageURL}}
                      style={{height: '100%', width: '100%'}}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: '#06C167',
                        width: '100%',
                        padding: 10,
                      }}>
                      <Text>Rs. {item.data.foodPrice}/each</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
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
    height: 120,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFE6E6',
  },
});

export default CartScreen;
