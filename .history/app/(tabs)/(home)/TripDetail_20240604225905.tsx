import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: '100%',
    height: 150,
  },
});
const TripDetail = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://thacoauto.vn/storage/thacobus/banner-post-bus-ghengoi-2.jpg',
        }}
      />
      <Text
        style={{
          width: 200,
          height: 50,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        FTravel Bus
      </Text>
    </View>
  );
};
export default TripDetail;
