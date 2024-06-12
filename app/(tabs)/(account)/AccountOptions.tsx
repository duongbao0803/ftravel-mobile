import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {
  ArrowRight2,
  Bus,
  EmptyWallet,
  Logout,
  Notification,
  TicketExpired,
} from 'iconsax-react-native';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const List = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <TouchableOpacity>
          <SectionComponent
            styles={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#CCC8C8',
              backgroundColor: '#fff',
              padding: 20,
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
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'column', gap: 5}}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    Dương Bảo
                  </Text>
                  <Text style={{fontSize: 15}}>duongbao2k3@gmail.com</Text>
                </View>
                <ArrowRight2 size="18" color="#1CBCD4" />
              </View>
            </View>
          </SectionComponent>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
          <TouchableOpacity>
            <SectionComponent
              styles={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: '#CCC8C8',
                backgroundColor: '#fff',
                padding: 20,
                borderBottomWidth: 0.4,
              }}>
              <View style={{flex: 1}}>
                <EmptyWallet size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={{flex: 6}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18}}>Ví của tôi</Text>
                  <ArrowRight2 size="18" color="#1CBCD4" />
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
          <TouchableOpacity>
            <SectionComponent
              styles={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: '#CCC8C8',
                backgroundColor: '#fff',
                padding: 20,
                borderBottomWidth: 0.4,
              }}>
              <View style={{flex: 1}}>
                <TicketExpired size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={{flex: 6}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18}}>Lịch sử mua vé</Text>
                  <ArrowRight2 size="18" color="#1CBCD4" />
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
          <TouchableOpacity>
            <SectionComponent
              styles={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: '#CCC8C8',
                backgroundColor: '#fff',
                padding: 20,
                borderBottomWidth: 0.4,
              }}>
              <View style={{flex: 1}}>
                <Notification size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={{flex: 6}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18}}>Thông báo</Text>
                  <ArrowRight2 size="18" color="#1CBCD4" />
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
          <TouchableOpacity>
            <SectionComponent
              styles={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: '#CCC8C8',
                backgroundColor: '#fff',
                padding: 20,
                borderBottomWidth: 0.4,
              }}>
              <View style={{flex: 1}}>
                <Logout size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={{flex: 6}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18}}>Đăng xuất</Text>
                  <ArrowRight2 size="18" color="#1CBCD4" />
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default List;
