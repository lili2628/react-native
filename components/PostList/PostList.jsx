import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import Container from '../Container/Container';



function PostsList ({ navigation, route }) {
  return (
    <Container>
      <View style={styles.container}>
         <FlatList/>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  exitBtn: {
    color: '#BDBDBD',
  },
});


export default PostsList;