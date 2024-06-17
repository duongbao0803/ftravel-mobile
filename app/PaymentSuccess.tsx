import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {Link, useRouter} from 'expo-router';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{flex: 1}}>
      <SectionComponent>
        <View
          style={{
            margin: 20,
            padding: 10,
            backgroundColor: '#fff',
            height: appInfo.sizes.HEIGHT * 0.4,
            borderRadius: 10,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
            }}>
            <Image
              source={require('@/assets/images/icon/success_icon.png')}
              style={{
                width: 80,
                height: 80,
                objectFit: 'contain',
                borderRadius: 100,
              }}
            />
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Tất cả đã xong
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', gap: 25}}>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Bạn vừa thanh toán thành công 511 FToken cho đơn hàng
              0D_20242705_001.
            </Text>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Mã giao dịch: 05112000
            </Text>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Xem chi tiết tại trang giao dịch.
            </Text>
          </View>
        </View>
        <View></View>
      </SectionComponent>
      <SectionComponent>
        <Link href="/InputOtp">
          <TouchableOpacity onPress={() => router.push('home')}>
            <Text>Xác nhận thông tin</Text>
          </TouchableOpacity>
        </Link>
      </SectionComponent>
    </SafeAreaView>
  );
};

export default PaymentSuccess;
