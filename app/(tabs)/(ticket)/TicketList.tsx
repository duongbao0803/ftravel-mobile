import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {View} from 'react-native-animatable';

const TicketList: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <SectionComponent styles={{display: 'flex'}}>
        <View style={{}}>
          <View style={{backgroundColor: 'red'}}>
            <Text>Sắp tới</Text>
          </View>
          <View style={{backgroundColor: 'yellow'}}>
            <Text>Đã đi</Text>
          </View>
        </View>
      </SectionComponent>
    </SafeAreaView>
  );
};

export default TicketList;
