import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import {colors, parameters} from '../globals/styles';

const Header = ({title, type, navigation}) => {
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={{color: '#fff'}}>{type}</Text>
      </Pressable>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
  },
  headerText: {
    color: colors.headerText,
    fontSize: 24,
    marginVertical: 20,
    marginHorizontal: 15,
    letterSpacing: 0.69,
  },
});
