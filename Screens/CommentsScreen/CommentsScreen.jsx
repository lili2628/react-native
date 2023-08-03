import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CommentForm from '../../components/CommentForm';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CommentsScreen = ({ navigation, route }) => {

  useEffect(() => {
    
    navigation.setOptions({
      headerLeft: () => (
        <Feather
          name="arrow-left"
          size={24}
          color={styles.headerBackBtn}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);


  
  return (
    <KeyboardAvoidingView
      style={styles.keyboardWrp}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
          <View>
            <View style={styles.container_list}>
                <Text>Comments</Text>
            </View>
          </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardWrp: {
    flex: 1,
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerBackBtn: '#212121',

  container_list: {
    gap: 32,
  },
});

export default CommentsScreen;