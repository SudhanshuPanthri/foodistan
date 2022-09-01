import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {colors} from './src/globals/styles';
import RootNavigator from './src/navigation/RootNavigator';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.buttons} />
      <RootNavigator />
      {/*<HomeScreen />*/}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
