import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {Bus} from 'iconsax-react-native';
import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';

const List = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <SectionComponent
          styles={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0.7,
            borderColor: '#CCC8C8',
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              width: appInfo.sizes.WIDTH * 0.2,
              height: appInfo.sizes.WIDTH * 0.2,
              borderWidth: 1,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
            }}>
            <Image
              source={require('@/assets/images/logo/logo_app_v2.png')}
              style={{
                width: 50,
                height: 50,
                objectFit: 'contain',
                borderRadius: 100,
              }}
            />
          </View>
          <View
            style={{
              width: appInfo.sizes.WIDTH * 0.7,
              paddingVertical: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Bus size="13" color="#000000" variant="Bold" />
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>FTRAVEL</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 12}}>13:07 </Text>
              <Text style={{fontSize: 12}}>18/12/2023</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 12}}>FTRVAEL </Text>
              <Text style={{fontSize: 12}}>
                Từng bừng khai trương tuyến xe HỒ CHÍ MINH - VŨNG TÀU
              </Text>
            </View>
          </View>
        </SectionComponent>
      </View>
    </SafeAreaView>
  );
};

export default List;
