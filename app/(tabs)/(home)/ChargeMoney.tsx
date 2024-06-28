import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {router} from 'expo-router';
import {Coin} from 'iconsax-react-native';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';

const ChargeMoney = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SectionComponent styles={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', gap: 5}}>
            <Text>Số dư ví:</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#FFC700'}}>100</Text>
              <Coin size="18" color="#FFC700" variant="Bulk" />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            margin: 20,
            padding: 10,
          }}>
          <SectionComponent
            styles={{
              width: '100%',
              backgroundColor: '#1CBCD4',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => router.push('home')}
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '700', fontSize: 18, color: '#fff'}}>
                Xác nhận
              </Text>
            </TouchableOpacity>
          </SectionComponent>
        </View>
      </SectionComponent>
    </SafeAreaView>
  );
};

export default ChargeMoney;
