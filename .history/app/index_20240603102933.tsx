import {Link} from 'expo-router';
import React from 'react';
import {Text, View} from 'react-native';

const index = () => {
  return (
    <View>
      <Link
        href={{pathname: '/List'}}
        style={{color: 'red'}}
        className="bg-white">
        Auth
      </Link>
      <Link href={{pathname: '/List'}} style={{color: 'red'}}>
        Link
      </Link>
      <Link href={{pathname: '/Search'}} style={{color: 'red'}}>
        Tab
      </Link>
      <Link href={{pathname: '/ListTrip'}} style={{color: 'red'}}>
        Trip
      </Link>
    </View>
  );
};

export default index;
