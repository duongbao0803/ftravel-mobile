import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {Bus} from 'iconsax-react-native';
import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';

const NoticeList = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{margin: 15}}>
        <SectionComponent
          styles={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            gap: 15,
            backgroundColor: '#fff',
            shadowColor: '#000000',
            elevation: 5,
            overflow: 'hidden',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 0.9,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('@/assets/images/logo/logo_ftravel.png')}
              style={{
                width: 60,
                height: 60,
                objectFit: 'contain',
                // borderRadius: 100,
                borderWidth: 1,
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingVertical: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Mua vé thành công
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 13, paddingRight: 10}}>
                Bạn đã mua vé thành công cho chuyến đi TP.HCM - Cần Thơ, ngày
                16/06/2024.
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                gap: 5,
                justifyContent: 'flex-end',
              }}>
              <Text>20:33</Text>
              <Text style={{fontSize: 13}}>18/12/2023</Text>
            </View>
          </View>
        </SectionComponent>
      </View>
    </SafeAreaView>
  );
};

export default NoticeList;
