import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
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

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <View>
      <ScrollView>
        {orders
          .sort((a, b) => {
            b.orderDate.seconds - a.orderData.seconds;
          })
          .map((item, index) => (
            <View>
              <Text>{index + 1}</Text>
              <Text>Order ID : {item.orderId}</Text>
              <Text>Order Date : {convertData(item.orderDate)}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default MyOrderScreen;
