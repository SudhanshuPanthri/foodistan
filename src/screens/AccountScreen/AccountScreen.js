import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const AccountScreen = ({navigation}) => {
  const [userLoggedUid, setUserLoggedUid] = useState(null);
  const [userData, setUserData] = useState();

  const checkUser = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUserLoggedUid(user.uid);
        navigation.navigate('RootClientTabs');
      } else {
        console.log('hello');
      }
    });
  };

  //logout function

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        setUserLoggedUid(null);
        navigation.navigate('WelcomeScreen');
      })
      .catch(error => {
        console.log(error);
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

  return (
    <View style={styles.parent}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.headerCard}>
          {userData && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '70%'}}>
                <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
                  {userData.name}
                </Text>
                <Text style={{fontSize: 16, color: '#000'}}>
                  {userData.email}
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
        <View style={styles.infoContainer}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => handleLogout()}
              style={{
                borderWidth: 1,
                padding: 10,
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 18, color: '#000'}}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    backgroundColor: '#EBF1F1',
    padding: 10,
    height: 100,
    width: '90%',
    borderRadius: 14,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: '#EBF1F1',
    width: '90%',
    height: 400,
    borderRadius: 14,
  },
});
