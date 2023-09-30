import { useState, useEffect } from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { collection, getCountFromServer, updateDoc, doc, getDoc  } from 'firebase/firestore';

import { db } from '../../firebase/config.js';



const Post = ({ post, navigation, route }) => {
  const [numberOfComments, setNumberOfComments] = useState(0);

  useEffect(() => {
    try {
      const checkNumber = async () => {
        const dbRef = collection(db, 'posts', post.id, 'comments');

        const snapshot = await getCountFromServer(dbRef);

        setNumberOfComments(snapshot.data().count);
      };
      checkNumber();
    } catch (error) {
      console.log('Number of comments', error.message);
    }
  }, [post]);
 
  const selectTitleLocation = ({ location }) => {
    if (location.title) {
      return location.title;
    };

    if (location.postAddress.city && !location.postAddress.street) {
      return `${location.postAddress.city}`;
    };

    if (location.postAddress.city && location.postAddress.street) {
      return `${location.postAddress.city}, ${location.postAddress.street}`;
    };

    return 'невідомо';
  };

  const onLikePressed = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postRef);
        const postLikes = postSnapshot.data().likes;
        const updatedLikes = Number(postLikes + 1);
    
        await updateDoc(postRef, {
          likes: updatedLikes,
        });
      } catch (error) {
        console.error("Error adding like:", error);
      }
   };


  return (
    <View style={styles.postWrp}>
      <Image source={{ uri: post.photo }} style={styles.photo} />
      <View style={styles.bottomInfo}>
        {route?.name !== 'Profile' && (
          <View style={styles.owner}>
            <Image source={{ uri: post.owner.avatar }} style={styles.avatar} />
          </View>
        )}
        
        <View style={styles.desc}>
          <Text style={styles.titlePost} ellipsizeMode="tail" numberOfLines={1}>
            {post.titlePost}
          </Text>
          
          <View style={styles.information}>
            <View style={styles.buttonsWrp}>
              <TouchableOpacity
                style={styles.buttonComments}
                onPress={() => navigation.navigate('Comments', post)}
              >
                <View style={numberOfComments ? styles.commentsIconIs : styles.commentsIcon}>
                  <Feather
                    name="message-circle"
                    size={24}
                    color={numberOfComments !== 0 ? '#FF6C00' : "#BDBDBD"}
                  />
                </View>
                <Text style={numberOfComments ? styles.commentsCountIs : styles.commentsCount}>{ numberOfComments }</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{...styles.button, marginLeft: 4}}
                onPress={() => onLikePressed(post.id)}
                >
                  <View style={styles.likes}>
                    <AntDesign name="like2" size={22} color={post.likes !== 0 ? '#FF6C00' : "#BDBDBD"} /> 
                  </View>
                  <Text style={post.likes ? styles.commentsCountIs : styles.commentsCount}>{ post.likes }</Text>
              </TouchableOpacity>
            </View>

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
    
  },
  information: {
    flexDirection: 'row',
    width: wp('75%'),
  },
  buttonComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  commentsIcon: {
    marginRight: hp('0.6%'),
    transform: [{ rotate: '-90deg' }],
    fill: '#BDBDBD',
  },
  commentsIconIs: {
    marginRight: hp('0.6%'),
    transform: [{ rotate: '-90deg' }],
    fill: '#FF6C00',
  },
  likes: {
    marginRight: 5,
  },
  commentsCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  commentsCountIs: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
  },
  buttonLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 90,
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
},
});

export default Post;