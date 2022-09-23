import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const MyOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    const orderRef = firebase
      .firestore()
      .collection('UserOrders')
      .where('orderUserUID', '==', auth().currentUser.uid);

    orderRef.onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => doc.data()));
    });
  };

  const convertData = date => {
    let newDate = new Date(date.seconds * 1000);
    return newDate.toDateString();
  };

  const cancelOrder = id => {
    const orderRef = firebase.firestore().collection('UserOrders').doc(id);
    orderRef.update({
      orderStaus: 'cancelled',
    });
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View style={styles.parent}>
      {orders != '' ? (
        <View>
          <View style={{marginVertical: 15, marginLeft: 10}}>
            <Text style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
              Order Summary
            </Text>
          </View>
          <ScrollView>
            {orders
              .sort((a, b) => {
                b.orderDate.seconds - a.orderData.seconds;
              })
              .map((order, index) => (
                <View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000',
                        marginVertical: 5,
                      }}>
                      Order ID : {order.orderId}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000',
                        marginVertical: 5,
                      }}>
                      Order Date : {convertData(order.orderDate)}
                    </Text>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {order.orderStaus === 'pending' && (
                      <View
                        style={{
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 5,
                          width: '60%',
                          elevation: 1,
                          backgroundColor: 'orange',
                        }}>
                        <Text style={{color: 'white'}}>
                          Your Order is Pending
                        </Text>
                      </View>
                    )}
                    {order.orderStaus === 'ontheway' && (
                      <View
                        style={{
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 5,
                          width: '60%',
                          elevation: 1,
                          backgroundColor: '#B1D7B4',
                        }}>
                        <Text style={{color: 'black'}}>
                          Your Order is On The Way Wohoo!
                        </Text>
                      </View>
                    )}
                    {order.orderStaus === 'delivered' && (
                      <View
                        style={{
                          borderWidth: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 5,
                          width: '60%',
                          elevation: 1,
                          backgroundColor: '#06C167',
                        }}>
                        <Text style={{color: 'white'}}>
                          Order has been delivered
                        </Text>
                      </View>
                    )}
                    {order.orderStaus === 'cancelled' && (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 5,
                          width: '60%',
                          backgroundColor: 'red',
                        }}>
                        <Text style={{color: 'white'}}>
                          Your Order was Cancelled
                        </Text>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                      Delivery Agent Name{' '}
                    </Text>
                    {order.deliveryPerson ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        {order.deliveryPerson}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        Not Assigned
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                      Delivery Agent Number
                    </Text>
                    {order.deliveryPersonNo ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        {order.deliveryPersonNo}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        Not Assigned
                      </Text>
                    )}
                  </View>
                  <View>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={order.orderData}
                      renderItem={({item}) => (
                        <View
                          style={{
                            backgroundColor: '#DAEAF1',
                            height: 55,
                            width: '100%',
                            // marginVertical: 10,
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
                                {item.addOnQuantity} X Rs.{' '}
                                {item.data.foodAddOnPrice}
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
                      marginVertical: 10,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>
                      Total Price
                    </Text>
                    <Text style={{fontSize: 16, fontWeight: '600'}}>
                      {order.orderCost}
                    </Text>
                  </View>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    {order.orderStaus !== 'delivered' &&
                    order.orderStaus !== 'cancelled' ? (
                      <TouchableOpacity
                        style={styles.cancelOrder}
                        onPress={() => cancelOrder(order.orderId)}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#000',
                          }}>
                          Cancel Order
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
              No recent orders
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cancelOrder: {
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    backgroundColor: '#06C167',
  },
});
