import React from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import MyOrderScreen from '../screens/MyOrderScreen/MyOrderScreen';
import AccountScreen from '../screens/AccountScreen/AccountScreen';

const ClientTabs = createBottomTabNavigator();

const RootClientTabs = () => {
  return (
    <ClientTabs.Navigator
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#000',
          borderRadius: 15,
          height: 90,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <ClientTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/homefilled.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#06C167' : '#fff',
                }}
              />
              <Text style={{color: focused ? '#06C167' : '#fff'}}>Home</Text>
            </View>
          ),
        }}
      />
      <ClientTabs.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/search.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#06C167' : '#fff',
                }}
              />
              <Text style={{color: focused ? '#06C167' : '#fff'}}>Search</Text>
            </View>
          ),
        }}
      />
      <ClientTabs.Screen
        name="MyOrderScreen"
        component={MyOrderScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/orders.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#06C167' : '#fff',
                }}
              />
              <Text style={{color: focused ? '#06C167' : '#fff'}}>Orders</Text>
            </View>
          ),
        }}
      />
      <ClientTabs.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../assets/account.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#06C167' : '#fff',
                }}
              />
              <Text style={{color: focused ? '#06C167' : '#fff'}}>Account</Text>
            </View>
          ),
        }}
      />
    </ClientTabs.Navigator>
  );
};

export default RootClientTabs;
