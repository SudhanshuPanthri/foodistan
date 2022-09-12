import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Modal,
  TextInput,
} from 'react-native';

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.parent}>
          <Image
            source={require('../assets/search.png')}
            style={{height: 30, width: 30, tintColor: '#06C167'}}
          />
          <Text
            style={{
              marginHorizontal: 10,
              // fontWeight: '600',
              fontSize: 16,
              color: '#000',
            }}>
            Discover your favourite food
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal animationType="fade" transparent={false} visible={modalVisible}>
        <View onPress={() => setModalVisible(false)}>
          <TextInput value="" placeholder="Search" />
        </View>
      </Modal>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  parent: {
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF8F3',
    // width: '80%',
  },
});
