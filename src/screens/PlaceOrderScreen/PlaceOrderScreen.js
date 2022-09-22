import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const PlaceOrderScreen = ({navigation, route}) => {
  const {cartData} = route.params;
  const [orderData, setOrderData] = useState([]);
  const [totalCost, setTotalCost] = useState('0');
  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState();

  const checkUser = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUserLoggedUid(user.uid);
        // navigation.navigate('RootClientTabs');
      } else {
        console.log('hello');
      }
    });
  };

  const getUserData = async () => {
    const userRef = firebase
      .firestore()
      .collection('UserData')
      .where('uid', '==', userLoggedUid);
    const user = await userRef.get();
    if (!user.empty) {
      user.forEach(doc => {
        setUserData(doc.data());
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    getUserData();
  }, [userLoggedUid]);

  useEffect(() => {
    setOrderData(JSON.parse(cartData));
  }, [cartData]);

  useEffect(() => {
    if (cartData != null) {
      const food = JSON.parse(cartData).cart;
      let totalFoodPrice = 0;
      food.map(item => {
        totalFoodPrice =
          parseInt(item.data.foodPrice) * parseInt(item.data.foodQuantity) +
          parseInt(item.data.AddOnPrice) * parseInt(item.data.AddOnQuantity) +
          totalFoodPrice;
      });
      setTotalCost(JSON.stringify(totalFoodPrice));
    }
  }, [cartData]);

  const paymentFunc = () => {
    const userRef = firebase
      .firestore()
      .collection('UserOrders')
      .doc(new Date().getTime().toString());

    userRef
      .set({
        orderId: userRef.id,
        orderData: orderData.cart,
        orderStaus: 'pending',
        orderCost: totalCost,
        orderDate: firebase.firestore.FieldValue.serverTimestamp(),
        // order address ka sochna hai abhi
        orderAddress: '',
        orderUserName: userData.name,
        orderUserUID: userLoggedUid,
        orderPayment: 'online',
        paymentStatus: 'paid',
      })
      .then(() => {
        navigation.navigate('OrderPlacedScreen');
      })
      .catch(error => {
        console.log(error);
      });
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
      </View>
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
            Your Order Summary
          </Text>
        </View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={orderData.cart}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: '#DAEAF1',
                  height: 80,
                  width: '100%',
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '65%',
                  }}>
                  <View style={{marginLeft: 10}}>
                    <Text>{item.data.foodName}</Text>
                    <Text>{item.data.foodAddOn}</Text>
                  </View>
                  <View>
                    <Text style={{marginHorizontal: 10}}>
                      {item.foodQuantity} X Rs. {item.data.foodPrice}
                    </Text>
                    <Text style={{marginHorizontal: 10}}>
                      {item.addOnQuantity} X Rs. {item.data.foodAddOnPrice}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginRight: 10,
                    width: 80,
                  }}>
                  <Text>
                    Rs.
                    {item.foodQuantity * item.data.foodPrice +
                      item.addOnQuantity * item.data.foodAddOnPrice}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 15,
          }}>
          <Text style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
            Order Total Rs. {totalCost}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{padding: 15, backgroundColor: '#06C167'}}
            onPress={() => paymentFunc()}>
            <Text style={{color: '#fff'}}>Proceed To Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  header: {
    marginVertical: 20,
    justifyContent: 'center',
  },
  container: {
    padding: 10,
  },
});
