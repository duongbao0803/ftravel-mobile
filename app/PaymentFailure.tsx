import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {Link, useRouter} from 'expo-router';
import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

const PaymentFailure: React.FC = () => {
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
              source={require('@/assets/images/icon/failure_icon.png')}
              style={{
                width: 80,
                height: 80,
                objectFit: 'contain',
                borderRadius: 100,
              }}
            />
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Thanh toán không thành công
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', gap: 25}}>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Giao dịch của bạn không thành công. Vui lòng thử lại sau!
            </Text>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Lí do: Số dư không đủ
            </Text>
            <Text style={{textAlign: 'center', fontSize: 18}}>
              Mã giao dịch: BAOBATLUC
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

export default PaymentFailure;
