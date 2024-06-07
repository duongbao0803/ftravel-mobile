import {Link, Redirect, Tabs, useNavigation} from 'expo-router';
import React from 'react';
import {
  Button,
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const ListTrip = (props: any) => {
  const navigation = useNavigation();
  console.log(screenWidth);
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          height: 46,
        }}>
        <Text>Hồ Chí Minh</Text>
        <Ionicons name="arrow-forward" size={24} color="black" />
        <Text>Cần Thơ</Text>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          justifyContent: 'center',
          height: 30,
        }}>
        <Text>T2 - 27/05</Text>
        <View
          style={{
            width: screenWidth > 370 ? 80 : 65,
            height: 3,
            backgroundColor: 'black',
          }}></View>
      </View>

      <ScrollView style={{marginBottom: 80}}>
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 144,
              borderRadius: 15,
              backgroundColor: 'white',
              shadowColor: 'rgba(0, 0, 0, 0.25)',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 1,
              shadowRadius: 4,
            }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                marginLeft: 11,
                marginRight: 10,
                marginTop: 15,
                marginBottom: 9,
                width: '30%',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>05:00</Text>
                  <Text style={{marginLeft: screenWidth > 370 ? 20 : 30}}>
                    HCM
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginLeft: 10,
                }}>
                <Text style={{color: '#8d8383dd'}}>6h00</Text>
                <Ionicons
                  name="arrow-down"
                  style={{marginLeft: 35}}
                  size={30}
                  color="black"
                />
              </View>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 2}}>
                  11:00
                </Text>
                <Text style={{marginLeft: 20}}>Cần Thơ</Text>
              </View>
              <View>
                <Text style={{fontWeight: 'bold', marginLeft: 5}}>
                  FTravel Bus
                </Text>
              </View>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                height: '100%',
                width: 2,
                borderColor: 'black',
                borderWidth: 1,
                marginLeft: 50,
              }}></View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: 15,
                marginBottom: 10,
                alignItems: 'center',
                marginRight: 12,
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 5,
                    fontSize: 18,
                    marginLeft: screenWidth > 370 ? 0 : 15,
                  }}>
                  1.026.000đ
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    textAlign: 'right',
                    width: 71,
                    color: 'red',
                  }}>
                  1 seat left
                </Text>
              </View>
              <Link
                href={{pathname: '/ListTrip/123'}}
                style={{
                  fontWeight: 'bold',
                  marginLeft: 30,
                  color: 'white',
                  backgroundColor: 'red',
                  padding: 8,

                  borderRadius: 8,
                }}>
                Detail
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <Link href="/List" asChild>
        <Pressable>
          <Text style={{color: 'red'}}>Home</Text>
        </Pressable>
      </Link> */}
    </View>
  );
};
export default ListTrip;