import { useSelector } from 'react-redux';

import { View, FlatList, Image, StyleSheet, Text } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { format } from 'date-fns';
import { uk } from 'date-fns/esm/locale';

import { selectStateLogin } from '../../redux/selectors.js';


const dateConverter = timestamp => {
    const date = new Date(timestamp.toDate());

    return format(Date.parse(date), 'dd MMMM, yyyy | HH:mm', { locale: uk });
};



const Comments = ({ allComments, photo }) => {

  const myLogin = useSelector(selectStateLogin);

  return (
    <View style={styles.container}>
        <FlatList
            data={allComments}
            keyExtractor={({ id }) => id}
              renderItem={({ item, index }) => (
                <>
                    {index === 0 && (
                    <Image source={{ uri: photo }} style={styles.photo} />
                    )}

                    <View style={ myLogin === item.owner.login
                        ? { ...styles.containerComment }
                        : { ...styles.containerComment, flexDirection: 'row' }
                    }>
                        <View style={styles.avatarWrp}>
                            <Image source={{ uri: item.owner.avatar }} style={styles.avatar} />
                        </View>
                        <View style={styles.commentWrp}>
                            <Text style={styles.comment}>{item.comment}</Text>
                            <Text style={styles.date}>{dateConverter(item.createdAt)}</Text>
                        </View>
                    </View>
                </>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            ListFooterComponent={<View style={{height: hp('8%')}}/>}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
  photo: {
    height: hp('28.8%'),
    marginTop: hp('3.8%'),
    marginBottom: hp('0.96%'),
    borderRadius: 8,
    borderColor: '#E8E8E8',
    },
  containerComment: {
    flexDirection: 'row-reverse',
    padding: 2,
    gap: 5,
  },
  commentWrp: {
    flex: 10,
    padding: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
  },
  avatarWrp: {
    flex: 1.4,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    borderWidth: 1,
    overflow: 'hidden',
  },
  login: {
    color: '#fff',
  },
  comment: {},
  date: {
    alignSelf: 'flex-end',
    color: '#BDBDBD',
  },
});

export default Comments;