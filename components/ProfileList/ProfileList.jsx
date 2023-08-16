import { View, FlatList, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Post from '../Post';


const ProfileList = ({ navigation, posts, route }) => {
  
 if (posts.length === 0) {
    return (
    <View style={styles.container}>  
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