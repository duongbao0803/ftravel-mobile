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
          <Text style={{fontWeight: 'bold'}}>5:00</Text>
        </View>
        <Ionicons name="arrow-forward" size={30} color="black" />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: '600', color: '#693BB8'}}>Can Tho</Text>
          <Text style={{fontWeight: 'bold'}}>11:00</Text>
        </View>
      </View>
      <View
        style={{
          height: '100%',
          marginTop: 10,
          marginHorizontal: 8,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: 'white',
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
        }}>
        <View>
          <Text>Bus Information</Text>
          <Text>Capacity: 50 seats</Text>
          <Text>Type: Limousine VIP</Text>
          <Text>Available Seat</Text>
          <Text>20 seats available</Text>
        </View>
        <View>
          <Text>Facility</Text>
          <View>
            <Ionicons name="server-sharp" size={24} color="black" />
            <Text>Comfort Seats</Text>
          </View>
          <View>
            <Ionicons name="time-outline" size={24} color="black" />
            <Text>On Time</Text>
          </View>
          <View>
            <Ionicons name="bag-handle" size={24} color="black" />
            <Text>Storage Space</Text>
          </View>
        </View>
      </View>
      <View style={{backgroundColor: '#fff'}}></View>
    </View>
  );
};
export default TripDetail;
