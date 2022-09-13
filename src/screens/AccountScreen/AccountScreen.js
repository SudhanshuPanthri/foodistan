import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const AccountScreen = ({navigation}) => {
  const [userLogged, setUserLogged] = useState(null);

  const checkUser = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUserLogged(user);
        navigation.navigate('RootClientTabs');
      } else {
        setUserLogged(null);
      }
    });
  };

  //logout function

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        setUserLogged(null);
        navigation.navigate('WelcomeScreen');
        console.log('User Logged Out');
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <View style={styles.parent}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.headerCard}>
          {userLogged && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '70%'}}>
                <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
                  Sudhanshu Panthri
                </Text>
                <Text style={{fontSize: 16, color: '#000'}}>
                  {userLogged.email}
                </Text>
              </View>
              <View
                style={{
                  width: '30%',
                }}>
                <Image
                  source={require('../../assets/user.gif')}
                  style={{
                    height: '100%',
                    width: '85%',
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerCard: {
    borderWidth: 2,
    backgroundColor: '#EBF1F1',
    padding: 10,
    height: 100,
    width: '90%',
    borderRadius: 14,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
