import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
} from 'react-native';

const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Pressable onPress={() => navigation.goBack()} style={{marginLeft: 10}}>
          <Text style={styles.back}>Back</Text>
        </Pressable>
        <View style={styles.wrapper}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#06C167',
              letterSpacing: 0.69,
            }}>
            SignUp
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          Welcome to Foodistan
        </Text>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={{marginVertical: 10, fontSize: 16, color: '#000'}}>
          Name/Email
        </Text>
        <TextInput style={styles.input} />
        <Text style={{marginVertical: 10, fontSize: 16, color: '#000'}}>
          Password
        </Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  footer: {
    height: '20%',
    width: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: {
    height: 50,
    width: 150,
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
  back: {
    fontSize: 20,
    fontWeight: '600',
  },
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  inputWrapper: {
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
});
