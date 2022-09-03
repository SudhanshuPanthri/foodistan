import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.parent}>
      {/*<Header title="Hello, Anonymous" type="back" navigation={navigation} />*/}
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
            Login
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>
          Good to see you back
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.loginBtnContainer}
          onPress={() => navigation.navigate('RootClientTabs')}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 16, textDecorationLine: 'underline'}}>
          Forgot Password ?
        </Text>
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.google}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            Login with Google{' '}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.facebook}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            Login with Facebook{' '}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{color: '#fff', fontSize: 18, marginVertical: 10}}>
          Doesn't have an account ?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text
            style={{
              textDecorationLine: 'underline',
              color: '#fff',
              fontSize: 18,
            }}>
            Create one :D
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
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
  loginBtnContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    height: 50,
    width: '60%',
    backgroundColor: '#06C167',
    borderWidth: 0,
  },
  google: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#EA4335',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebook: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#4267B2',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    fontSize: 20,
    fontWeight: '600',
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
});
