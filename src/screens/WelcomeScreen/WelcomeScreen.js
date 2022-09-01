import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Swiper from 'react-native-swiper';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/*<Header title="Ready to discover new food places ?" />*/}
      <View style={styles.contentWrapper}>
        <Text style={styles.content}>
          Ready to Discover your favourite food places ?
        </Text>
      </View>
      <View style={styles.carousel}>
        <Swiper autoplay={true}>
          <View style={styles.illustrationWrapper}>
            <Image
              source={require('../../assets/illustration1.png')}
              style={styles.illustration}
            />
          </View>
          <View style={styles.illustrationWrapper}>
            <Image
              source={require('../../assets/illustration.png')}
              style={styles.illustration}
            />
          </View>
          <View style={styles.illustrationWrapper}>
            <Image
              source={require('../../assets/illustration2.png')}
              style={styles.illustration}
            />
          </View>
          <View style={styles.illustrationWrapper}>
            <Image
              source={require('../../assets/illustration3.png')}
              style={styles.illustration}
            />
          </View>
        </Swiper>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    height: '15%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 0.44,
  },
  footer: {
    height: '21%',
    width: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  carousel: {
    height: '64%',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationWrapper: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItem: 'center',
    padding: 10,
  },
  illustration: {
    height: '90%',
    width: '90%',
  },
  buttonContainer: {
    height: 50,
    width: 100,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
