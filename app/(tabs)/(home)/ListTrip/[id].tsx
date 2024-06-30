import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
  const router = useRouter();
  return (
    <>
      <ScrollView style={{marginBottom: 5, paddingBottom: 560}}>
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
              paddingBottom: 60,
              borderRadius: 10,
              padding: 10,
            }}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Bus Information
              </Text>
              <Text style={{marginTop: 10}}>Capacity: 50 seats</Text>
              <Text>
                Description: FTravelBus là một doanh nghiệp uy tín, thành công
                và có đóng góp quan trọng trong ngành vận tải Việt Nam.
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
                Available Seat
              </Text>
              <Text>20 seats available</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Facility</Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  marginBottom: 10,
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Ionicons name="server-sharp" size={24} color="black" />
                <Text>Comfort Seats</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Ionicons name="time-outline" size={24} color="black" />
                <Text>On Time</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  gap: 10,
                  alignItems: 'center',
                }}>
                <Ionicons name="bag-handle" size={24} color="black" />
                <Text>Storage Space</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 50,
          right: 50,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => router.push('ChooseSeat')}
          style={{
            backgroundColor: '#1CBCD4',
            padding: 10,
            paddingHorizontal: 40,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            Pick a seat
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default TripDetail;
