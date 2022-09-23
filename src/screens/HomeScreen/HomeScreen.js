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
import {categoryData} from '../../data';
import {firebase} from '../../Firebase/FirebaseConfig';
import Slider from '../../components/Slider';

const HomeScreen = ({navigation}) => {
  //all states
  const [indexCheck, setIndexCheck] = useState('0');
  // const [active, setActive] = useState(true);
  const [search, setSearch] = useState('');

  const [foodData, setFoodData] = useState([]);
  const [vegData, setVegData] = useState([]);
  const [nonVegData, setNonVegData] = useState([]);

  const foodRef = firebase.firestore().collection('FoodData');
  useEffect(() => {
    foodRef.onSnapshot(snapshot => {
      setFoodData(snapshot.docs.map(doc => doc.data()));
    });
  }, []);

  useEffect(() => {
    setVegData(foodData.filter(item => item.foodType === 'veg'));
    setNonVegData(foodData.filter(item => item.foodType === 'non-veg'));
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
        <TouchableOpacity
          onPress={() => navigation.navigate('CartScreen')}
          style={{marginRight: 10, position: 'relative', flexDirection: 'row'}}>
          <Image
            source={require('../../assets/cart.gif')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <View
          style={{
            width: '80%',
            borderWidth: 2,
            borderColor: 'black',
            marginVertical: 10,
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 100}}>
        <View style={styles.categoryWrapper}>
          <Text style={{fontSize: 24, fontWeight: '600', color: '#000'}}>
            Categories
          </Text>
          <View style={styles.cardWrapper}>
            <FlatList
              data={foodData}
              keyExtractor={item => item.id}
              extraData={indexCheck}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => setIndexCheck(index)}
                  style={
                    indexCheck === index
                      ? styles.categoryCard
                      : styles.categoryCardSelected
                  }>
                  <Image
                    source={require('../../assets/foodss.png')}
                    style={{height: 60, width: 60}}
                  />
                  <Text
                    style={
                      indexCheck === index ? styles.cardText : styles.cardText1
                    }>
                    {item.foodCategory}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.sliderWrapper}>
          <Slider
            title="Today's Special"
            data={foodData}
            navigation={navigation}
          />
        </View>
        <View style={styles.sliderWrapper}>
          <Slider title="Veg Dhamaka" data={vegData} navigation={navigation} />
        </View>
        <View style={styles.sliderWrapper}>
          <Slider
            title="Non-Veg Craving"
            data={nonVegData}
            navigation={navigation}
          />
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
    textTransform: 'capitalize',
  },
  cardText1: {
    fontWeight: '600',
    color: '#000',
    marginTop: 5,
    textTransform: 'capitalize',
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
