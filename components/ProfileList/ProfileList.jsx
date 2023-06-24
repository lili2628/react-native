import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


function ProfileList  ({ navigation, route })  {
  return (
    <View style={styles.container}>
      <FlatList
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