import React from 'react';
import {Button, Text, View} from 'react-native';
const ListTrip = (props: any) => {
  return (
    <View>
      <Text style={{color: 'white'}}>Hello</Text>
      <Button
        title="Navigate To List"
        onPress={() => props.navigation.navigate('List')}></Button>
    </View>
  );
};
export default ListTrip;
