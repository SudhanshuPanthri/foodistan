import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {colors} from './src/globals/styles';
import RootNavigator from './src/navigation/RootNavigator';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.buttons} />
      <RootNavigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'sans-serif',
  },
});
