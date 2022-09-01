import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {categoryData} from '../../data';

const HomeScreen = () => {
  const [cart, setCart] = useState(0);
  const [pressed, setPressed] = useState(true);
  const [indexCheck, setIndexCheck] = useState('0');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={{marginRight: 10, padding: 10}}>
          <Image
            source={require('../../assets/menu.png')}
            style={styles.headerIcon}
          />
        </Pressable>
        <View>
          <Text
            style={{
              color: '#06C167',
              fontSize: 24,
              fontWeight: '600',
              letterSpacing: 1,
            }}>
            Foodistan
          </Text>
        </View>
        <Pressable
          style={{marginRight: 10, position: 'relative', flexDirection: 'row'}}>
          <Image
            source={require('../../assets/cart.gif')}
            style={styles.headerIcon}
          />
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: '#000',
              justifyContent: 'center',
              alignItems: 'center',
              right: 0,
              bottom: 5,
              borderRadius: 50,
            }}>
            <Text style={{color: '#fff', fontSize: 12}}>{cart}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={pressed ? styles.btn : styles.btn1}
          onPress={() => setPressed(!pressed)}>
          <Text
            style={{color: 'white', fontWeight: '600', letterSpacing: 0.45}}>
            Delivery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={pressed ? styles.btn1 : styles.btn}
          onPress={() => setPressed(!pressed)}>
          <Text
            style={{color: 'white', fontWeight: '600', letterSpacing: 0.45}}>
            Pick-up
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.search}>
            <View>
              <Image
                source={require('../../assets/location.png')}
                style={{height: 30, width: 30}}
              />
            </View>
            <View style={{marginHorizontal: 15}}>
              <Text>Sant Nagar, Delhi</Text>
            </View>
            <View
              style={{
                backgroundColor: '#FBF8F3',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                padding: 4,
              }}>
              <View>
                <Image
                  source={require('../../assets/clock.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <View style={{marginHorizontal: 10}}>
                <Text>Now</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginLeft: 20}}>
            <Image
              source={require('../../assets/filter.png')}
              style={{height: 40, width: 40}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
            Categories
          </Text>
          <View style={styles.cardWrapper}>
            <FlatList
              data={categoryData}
              keyExtractor={item => item.id}
              extraData={indexCheck}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setIndexCheck(item.id)}
                  style={
                    indexCheck === item.id
                      ? styles.categoryCard
                      : styles.categoryCardSelected
                  }>
                  <Image source={item.image} style={{height: 60, width: 60}} />
                  <Text
                    style={
                      indexCheck === item.id
                        ? styles.cardText
                        : styles.cardText1
                    }>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
            Free Delivery Now
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerIcon: {
    height: 30,
    width: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  btn: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06C167',
  },
  btn1: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
  search: {
    borderWidth: 2,
    padding: 10,
    width: '75%',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryWrapper: {
    padding: 10,
  },
  categoryCard: {
    height: 100,
    width: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06C167',
    borderRadius: 20,
  },
  categoryCardSelected: {
    height: 100,
    width: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBF8F3',
    borderRadius: 20,
  },
  cardWrapper: {
    flexDirection: 'row',
  },
  cardText: {
    fontWeight: '600',
    color: '#fff',
    marginTop: 5,
  },
  cardText1: {
    fontWeight: '600',
    color: '#000',
    marginTop: 5,
  },
});
