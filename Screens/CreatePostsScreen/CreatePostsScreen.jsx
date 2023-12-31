
import React from 'react';

import { View, StyleSheet } from 'react-native';

import CreatePost from '../../components/CreatePost';


const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CreatePost navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
});

export default CreatePostsScreen;