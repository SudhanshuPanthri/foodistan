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
import {firebase} from '../../Firebase/FirebaseConfig';
import auth from '@react-native-firebase/auth';

const SignupScreen = ({navigation}) => {
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // states for input fields information

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // states for user account messages
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // signup function
  const handleSignUp = () => {
    const userData = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    if (password !== confirmPassword) {
      alert('Password does not match!');
    }
    try {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert('User created successfully');
          const userRef = firebase.firestore().collection('UserData');
          userRef
            .add(userData)
            .then(() => setSuccessMessage('Account Created :D'))
            .catch(error => setErrorMessage(error.message));
        })
        .catch(error => setErrorMessage('Firebase Error: ' + error.message));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.parent}>
      {successMessage == null ? (
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
            {errorMessage !== '' && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text style={{fontWeight: 'bold', color: 'red'}}>
                  {errorMessage}
                </Text>
              </View>
            )}
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
                  setErrorMessage('');
                }}
                onChangeText={text => setName(text)}
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
                  setErrorMessage('');
                }}
                onChangeText={text => setEmail(text)}
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
                  setErrorMessage('');
                }}>
                <TextInput
                  style={{
                    padding: 10,
                    width: '85%',
                  }}
                  secureTextEntry={!showPassword}
                  onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}>
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
                  setErrorMessage('');
                }}>
                <TextInput
                  style={{
                    padding: 10,
                    width: '85%',
                  }}
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
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
                  onPress={() => handleSignUp()}>
                  <Text
                    style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{flex: 1, justifyContent: 'center', backgroundColor: '#fff'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                // backgroundColor: '#E4E5E6',
              }}>
              <Text style={{color: 'green', fontSize: 22, fontWeight: '600'}}>
                {successMessage}
              </Text>
            </View>
            <View>
              <Image
                source={require('../../assets/done.gif')}
                style={{height: 250, width: 250}}
              />
            </View>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.loginBtnContainer}
              onPress={() => setSuccessMessage(null)}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#fff'}}>
                Go Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
    marginVertical: 20,
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
