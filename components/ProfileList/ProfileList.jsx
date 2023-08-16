import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { MaterialIcons } from '@expo/vector-icons';

import Post from '../Post';


const ProfileList = ({ navigation, posts, route }) => {
  console.log('posts', posts);
  
 if (posts.length === 0) {
    return (
    <View style={styles.container}>
       <Text>Фото відсутні</Text>

        <TouchableOpacity
          style={styles.buttonCapture}
          onPress={() => navigation.navigate('Create')}
        >
          <MaterialIcons name="photo-camera" size={24} color="white" />
        </TouchableOpacity>
     </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={({id}) => id}
        renderItem={({ item }) => <Post post={item} navigation={navigation} route={route}/>}
        ListFooterComponent={<View style={{ height: hp('12%') }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  text: {
  },
  buttonCapture: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#FF6C00',
  },
});

export default ProfileList;