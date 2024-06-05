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
      <Link href={'/test'}>
        <Text style={{backgroundColor: 'white'}}>T2 - 27/05</Text>
      </Link>
      <Link href="/List" asChild>
        <Pressable>
          <Text style={{color: 'white'}}>Home</Text>
        </Pressable>
      </Link>
    </View>
  );
};
export default ListTrip;
