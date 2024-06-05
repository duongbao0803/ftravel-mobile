import {Link} from 'expo-router';
import React from 'react';
import {Button, Pressable, Text, View} from 'react-native';
const ListTrip = () => {
  return (
    <View>
      <Text style={{color: 'white'}}>Hello</Text>
      <Link href="/List" asChild>
        <Pressable>
          <Text style={{color: 'white'}}>Home</Text>
        </Pressable>
      </Link>
    </View>
  );
};
export default ListTrip;
