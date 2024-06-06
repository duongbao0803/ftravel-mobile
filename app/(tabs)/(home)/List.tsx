import {Link} from 'expo-router';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

const List = () => {
  return (
    <View>
      <Text style={{color: 'white'}}>ListHome</Text>
      <Link href="/ListTrip" asChild>
        <Pressable>
          <Text style={{color: 'white'}}>List Trip</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default List;
