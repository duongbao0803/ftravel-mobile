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
            gap: 10,
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
              paddingVertical: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Bus size="13" color="#000000" variant="Bold" />
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Đặt vé thành công
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 13}}>
                Bạn đã đặt vé tuyến TP Hồ Chí Minh - Vũng Tàu thành công. Vui
                lòng kiểm tra vé để biết thêm thông tin chi tiết.{' '}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 13, fontWeight: 'bold'}}>
                1 ngày trước{' '}
              </Text>
              <Text style={{fontSize: 13}}>18/12/2023</Text>
            </View>
          </View>
        </SectionComponent>
      </View>
    </SafeAreaView>
  );
};

export default List;
