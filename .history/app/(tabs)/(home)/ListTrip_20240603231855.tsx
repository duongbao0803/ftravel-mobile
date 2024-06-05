import {Link, Tabs} from 'expo-router';
import React from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
const ListTrip = (props: any) => {
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
        <View style={{width: 80, height: 3, backgroundColor: 'black'}}></View>
      </View>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <View
          style={{
            width: '95%',
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
              flexDirection: 'row',
              marginLeft: 11,
              marginRight: 10,
              marginTop: 15,
              width: '65%',
            }}>
            <View>
              <Text style={{fontWeight: 'bold'}}>05:00</Text>
              <Text>HCM</Text>
            </View>
            <View>
              <Text style={{fontWeight: 'bold'}}>11:00</Text>
              <Text>Cần Thơ</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 10,
              marginBottom: 10,
              alignItems: 'center',
              marginRight: 12,
            }}>
            <View>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>1.000đ</Text>
              <Text style={{fontSize: 11, paddingLeft: 8, fontWeight: '400'}}>
                Còn 1 chỗ
              </Text>
            </View>
            <Text style={{fontWeight: '500'}}>Chi tiết</Text>
          </View>
        </View>
      </View>

      <Link href="/List" asChild>
        <Pressable>
          <Text style={{color: 'red'}}>Home</Text>
        </Pressable>
      </Link>
    </View>
  );
};
export default ListTrip;
