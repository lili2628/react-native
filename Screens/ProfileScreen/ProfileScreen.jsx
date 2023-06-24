import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  StyleSheet 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ProfileList from '../../components/ProfileList';
import {
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Container from "../../components/Container";

function ProfileScreen ({ navigation, route }) {
  const imageBg = require('../../images/bg-image.jpg');

  return (
    <Container>
      <ImageBackground source={imageBg} style={styles.imageBg}>
        <View style={styles.container}>
          <View style={styles.myPostsContainer}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrp}>
              </View>

              <TouchableOpacity
                style={styles.buttonAvatar}
              >
                <Text style={styles.buttonAvatarText}>{'+'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.exitBtn}>
              <Feather
                name="log-out"
                size={24}
                color={styles.exitBtn.color}
                onPress={() => navigation.navigate('Login')}
              />
            </View>

            <Text style={styles.login}>login</Text>
            
            <ProfileList navigation={navigation} route={route} />
          
          </View>
        </View>
      </ImageBackground>
    </Container>
  );
};



const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  container: {
    marginTop: hp('20%'),
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#fff',
  },
  myPostsContainer: {
    paddingTop: hp('7%'),
    minHeight: hp('50%'),
  },
  avatarContainer: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  avatarWrp: {
    borderRadius: 16,
    overflow: 'hidden',
    height: hp('14%'),
    width: hp('14%'),
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  buttonAvatar: {
    position: 'absolute',
    bottom: 13,
    right: -13,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#FF6C00',
    backgroundColor: '#ffffff',
  },
  buttonAvatarText: {
    color: '#FF6C00',
  },
  exitBtn: {
    position: 'absolute',
    right: 0,
    top: 16,
    color: '#BDBDBD',
  },
  login: {
    marginBottom: 5,
    alignSelf: 'center',
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    fontWeight: '500',
  },
  count:{ 
    alignSelf: 'flex-end',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    marginBottom: 3,
    color: '#BDBDBD',
  },
});



export default ProfileScreen;