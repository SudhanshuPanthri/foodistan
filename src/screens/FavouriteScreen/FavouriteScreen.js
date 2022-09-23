import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const FavouriteScreen = () => {
  const [favFoodData, setFavFoodData] = useState(null);

  const getFavData = async () => {
    const docRef = await firebase
      .firestore()
      .collection('Favourites')
      .doc(auth().currentUser.uid);

    docRef.get().then(doc => {
      if (doc.exists) {
        const data = JSON.stringify(doc.data());
        setFavFoodData(data);
      }
    });
  };

  useEffect(() => {
    getFavData();
  }, [favFoodData]);

  return (
    <View style={styles.parent}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: '600',
          color: '#000',
          marginTop: 30,
          marginBottom: 30,
        }}>
        Your Favourites
      </Text>
      {favFoodData !== null ? (
        <FlatList
          data={JSON.parse(favFoodData).fav}
          renderItem={({item}) => (
            <View style={styles.container}>
              <View style={{width: '55%'}}>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#000',
                  }}>
                  {item.data.foodName}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#000',
                  }}>
                  {item.data.restaurantName}
                </Text>
              </View>
              <View
                style={{
                  width: '45%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.data.foodImageURL}}
                  style={{height: '95%', width: '58%'}}
                />
              </View>
            </View>
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22, color: '#000'}}>Nothing to see here</Text>
          <Image
            source={require('../../assets/bubble-gum-downloading.gif')}
            style={{height: '70%', width: '100%'}}
          />
        </View>
      )}
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#DAEAF1',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});
