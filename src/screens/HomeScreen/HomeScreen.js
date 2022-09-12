import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import {categoryData, restaurantData} from '../../data';
import ItemCard from '../../components/ItemCard';
import CountDown from 'react-native-countdown-component';
import {firebase, firestore} from '../../Firebase/FirebaseConfig';
import Slider from '../../components/Slider';
import Geolocation from 'react-native-geolocation-service';

const HomeScreen = ({navigation}) => {
  //all states
  const [cart, setCart] = useState(0);
  const [pressed, setPressed] = useState(true);
  const [indexCheck, setIndexCheck] = useState('0');
  const [active, setActive] = useState(true);
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('');

  // states for food

  const [foodData, setFoodData] = useState([]);
  const [vegData, setVegData] = useState([]);
  const [nonVegData, setNonVegData] = useState([]);

  // const foodRef = firebase.firestore().collection('FoodData');
  const foodRef = firebase.firestore().collection('FoodData');
  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  useEffect(() => {
    setVegData(foodData.filter(item => item.foodType == 'veg'));
    setNonVegData(foodData.filter(item => item.foodType == 'non-veg'));
  }, [foodData]);

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
      <View style={styles.searchBarContainer}>
        <View
          style={{
            width: '80%',
            borderWidth: 2,
            borderColor: 'black',
            marginVertical: 10,
            // padding: 10,
            borderRadius: 14,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/search.png')}
            style={{height: 25, width: 25, marginHorizontal: 10}}
          />
          <TextInput
            style={{fontSize: 16}}
            placeholder="Search Your Favourite Food"
            placeholderTextColor="black"
            onChangeText={text => setSearch(text)}
          />
        </View>
        {search !== '' && (
          <View style={styles.searchOuter}>
            <FlatList
              data={foodData}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                if (
                  item.foodName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <TouchableOpacity style={styles.searchResult}>
                      <Image
                        source={require('../../assets/dot.png')}
                        style={{height: 25, width: 25, marginHorizontal: 10}}
                      />
                      <Text style={{color: '#000', fontSize: 16}}>
                        {item.foodName}
                      </Text>
                    </TouchableOpacity>
                  );
                }
              }}
              style={styles.searchInner}
            />
          </View>
        )}
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
              <Text>Sant Nagar,Delhi</Text>
            </View>
            <View
              style={{
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
        <View style={styles.sliderWrapper}>
          <Slider title="Today's Special" data={foodData} />
        </View>
        <View style={styles.sliderWrapper}>
          <Slider title="Veg Dhamaka" data={vegData} />
        </View>
        <View style={styles.sliderWrapper}>
          <Slider title="Non-Veg Craving" data={nonVegData} />
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
            Free Delivery Now
          </Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#000',
                letterSpacing: 0.4,
              }}>
              Options changing in
            </Text>
            <CountDown
              until={3600}
              size={14}
              timeToShow={['M', 'S']}
              timeLabels={{m: '', s: ''}}
              style={{marginHorizontal: 10}}
            />
          </View>
          <FlatList
            data={restaurantData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ItemCard
                name={item.name}
                image={item.image}
                totalReviews={item.totalReviews}
                Address={item.Address}
                farAway={item.farAway}
                averageRating={item.averageRating}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
            Offer Zone
          </Text>
          <FlatList
            data={restaurantData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ItemCard
                name={item.name}
                image={item.image}
                totalReviews={item.totalReviews}
                Address={item.Address}
                farAway={item.farAway}
                averageRating={item.averageRating}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.categoryWrapper}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
            Top Picks near you
          </Text>
          <FlatList
            data={restaurantData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ItemCard
                name={item.name}
                image={item.image}
                totalReviews={item.totalReviews}
                Address={item.Address}
                farAway={item.farAway}
                averageRating={item.averageRating}
              />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
      {/*{pressed && (*/}
      {/*  <TouchableOpacity*/}
      {/*    style={styles.floatingButton}*/}
      {/*    onPress={() => navigation.navigate('RestaurantMapScreen')}>*/}
      {/*    <Image*/}
      {/*      source={require('../../assets/mappin.png')}*/}
      {/*      style={{height: 30, width: 30, tintColor: '#06C167'}}*/}
      {/*    />*/}
      {/*  </TouchableOpacity>*/}
      {/*)}*/}
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
  searchBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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
    // borderWidth: 2,
    backgroundColor: '#E4E5E6',
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
  itemCardContainer: {
    flexDirection: 'row',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    backgroundColor: '#000',
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResult: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    // height: '10%',
  },
  searchOuter: {
    borderWidth: 1,
    borderRadius: 14,
    width: '80%',
    backgroundColor: '#FBF8F3',
    height: 150,
  },
});
