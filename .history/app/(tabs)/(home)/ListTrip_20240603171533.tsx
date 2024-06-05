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
            justifyContent: 'center',
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
          <Text>5:00</Text>
          <View
            style={{
              width: 70,
              height: 0,
              flexShrink: 0,
              fill: '#000',
              strokeWidth: 2,
              stroke: '#D0CDCD',
            }}></View>
          <Text>11:00</Text>
          <Text>5:00</Text>
          <Text>5:00</Text>
          <Text>5:00</Text>
          <Text>5:00</Text>
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
