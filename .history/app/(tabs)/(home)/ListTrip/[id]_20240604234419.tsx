import {Ionicons} from '@expo/vector-icons';
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
      <View style={{width: '100%', alignItems: 'center', marginTop: 10}}>
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: 'red',
            width: 140,
            height: 30,
            paddingTop: 5,
            color: '#fff',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          FTravel Bus
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 5,
          padding: 5,
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold'}}>Mon, 27th May, 2024</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 5,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: '600', color: '#693BB8'}}>
            Ho Chi Minh City
          </Text>
          <Text>5:00</Text>
        </View>
        <Ionicons name="arrow-forward" size={30} color="black" />
        <View style={{alignItems: 'center'}}>
          <Text>Can Tho</Text>
          <Text>11:00</Text>
        </View>
      </View>
    </View>
  );
};
export default TripDetail;
