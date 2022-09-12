import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';

const SignupScreen = ({navigation}) => {
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <View style={styles.parent}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{marginLeft: 10}}>
              <Image
                source={require('../../assets/back.png')}
                style={{height: 25, width: 25}}
              />
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
        </View>
        <View style={styles.wrapper}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#000',
              letterSpacing: 0.5,
            }}>
            Welcome to Foodistan
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              color: '#000',
              fontWeight: '600',
            }}>
            Full Name
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: nameFocus ? '#06C167' : '#000',
              width: '100%',
            }}
            onFocus={() => {
              setNameFocus(true);
              setEmailFocus(false);
              setPasswordFocus(false);
              setConfirmPasswordFocus(false);
            }}
          />
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              color: '#000',
              fontWeight: '600',
            }}>
            Email
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderColor: emailFocus ? '#06C167' : '#000',
              width: '100%',
            }}
            onFocus={() => {
              setNameFocus(false);
              setEmailFocus(true);
              setPasswordFocus(false);
              setConfirmPasswordFocus(false);
            }}
          />
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              color: '#000',
              fontWeight: '600',
            }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: passwordFocus ? '#06C167' : '#000',
              borderRadius: 10,
            }}
            onFocus={() => {
              setNameFocus(false);
              setEmailFocus(false);
              setPasswordFocus(true);
              setConfirmPasswordFocus(false);
            }}>
            <TextInput
              style={{
                padding: 10,
                width: '85%',
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={
                  showPassword
                    ? require('../../assets/eye.png')
                    : require('../../assets/eyeclosed.png')
                }
                style={{height: 30, width: 30, marginHorizontal: 10}}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 16,
              color: '#000',
              fontWeight: '600',
            }}>
            Confirm Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: confirmPasswordFocus ? '#06C167' : '#000',
              borderRadius: 10,
            }}
            onFocus={() => {
              setNameFocus(false);
              setEmailFocus(false);
              setPasswordFocus(false);
              setConfirmPasswordFocus(true);
            }}>
            <TextInput
              style={{
                padding: 10,
                width: '85%',
              }}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Image
                source={
                  showConfirmPassword
                    ? require('../../assets/eye.png')
                    : require('../../assets/eyeclosed.png')
                }
                style={{height: 30, width: 30, marginHorizontal: 10}}
              />
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={() => navigation.navigate('RootClientTabs')}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={{color: '#fff', fontSize: 18, marginVertical: 10}}>
          Already have an account ?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
              Login
            </Text>
          </View>
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
    height: '14%',
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
