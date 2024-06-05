import {Link} from 'expo-router';
import React from 'react';
import {Button, Pressable, Text, View} from 'react-native';
const ListTrip = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Text>Hồ Chí Minh</Text>
        <Text>&#xF138</Text>
        <Text>Cần Thơ</Text>
      </View>
      <Link href="/List" asChild>
        <Pressable>
          <Text style={{color: 'white'}}>Home</Text>
        </Pressable>
      </Link>
    </View>
  );
};
export default ListTrip;
