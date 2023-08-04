
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Post = ({ post, navigation}) => {
 
  const selectTitleLocation = ({ location }) => {
    if (location.title) {
      return location.title;
    }

    if (location.postAddress.city && !location.postAddress.street) {
      return `${location.postAddress.city}`;
    }

    if (location.postAddress.city && location.postAddress.street) {
      return `${location.postAddress.city}, ${location.postAddress.street}`;
    }

    return 'невідомо';
  };

  return (
    <View style={styles.postWrp}>
      <Image source={{ uri: post.photoUri }} style={styles.photo} />
      <View style={styles.bottomInfo}>
        
        <View style={styles.desc}>
          <Text style={styles.titlePost} ellipsizeMode="tail" numberOfLines={1}>
            {post.titlePost}
          </Text>
          
          <View style={styles.buttonsWrp}>
            <TouchableOpacity
              style={styles.buttonComments}
              onPress={() => navigation.navigate('Comments', post)}
            >
              <View style={styles.commentsIcon}>
                <Feather
                  name="message-circle"
                  size={24}
                  color={styles.commentsIcon.fill}
                />
              </View>
              <Text style={styles.commentsCount}>count com</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonLocation}
              onPress={() => navigation.navigate('Map', post)}
            >
              <View style={styles.mapIcon}>
                <Feather name="map-pin" size={24} color={styles.mapIcon.fill} />
              </View>
              <Text
                style={styles.mapTitle}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {selectTitleLocation(post)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  postWrp: {
    marginBottom: hp('3%'),
  },
  photo: {
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    height: hp('28.8%'),
    marginBottom: hp('0.96%'),
    borderRadius: 8,
    borderColor: '#E8E8E8',
  },
  bottomInfo: {
    flexDirection: 'row',
  },
  owner: {
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: '#BDBDBD',
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    borderWidth: 1,
    overflow: 'hidden',
  },
  desc: {},
  titlePost: {
    marginBottom: hp('0.96%'),
    maxWidth: wp('70%'),
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  buttonsWrp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('75%'),
  },
  buttonComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 40,
  },
  commentsIcon: {
    marginRight: hp('0.6%'),
    transform: [{ rotate: '-90deg' }],
    fill: '#BDBDBD',
  },
  commentsCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  buttonLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon: {
    marginRight: hp('0.6%'),
    fill: '#BDBDBD',
  },
  mapTitle: {
    maxWidth: wp('60%'),
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: '#212121',
  },
});

export default Post;