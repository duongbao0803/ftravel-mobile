import {SectionComponent, SpaceComponent} from '@/components/custom';
import {appColors} from '@/constants/appColors';
import {appInfo} from '@/constants/appInfoStyles';
import {Coin} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';

const ChargeMoney = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [amount, setAmount] = useState('');

  const handleOptionPress = (value: number) => {
    setAmount(value.toString());
  };

  const handlePaymentMethod = (paymentMethod: React.SetStateAction<string>) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handlePayment = () => {
    console.log('check amound', amount, selectedPaymentMethod);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <SectionComponent styles={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View
            style={{flexDirection: 'row', gap: 5, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Số dư ví:</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#FFC700', fontWeight: 'bold'}}>100</Text>
              <Coin size="18" color="#FFC700" variant="Bulk" />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={{
                height: 40,
                width: appInfo.sizes.WIDTH * 0.9,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 10,
                paddingLeft: 10,
                textAlign: 'center',
              }}
              placeholder="Nhập số FToken muốn nạp"
              onChangeText={text => setAmount(text)}
              value={amount}
              keyboardType="numeric"
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                width: appInfo.sizes.WIDTH * 0.9,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderColor: 'yellow',
                  backgroundColor: '#F1F1F1',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 15,
                  alignItems: 'center',
                }}
                onPress={() => handleOptionPress(50)}>
                <Text
                  style={{color: '#757575', fontWeight: '700', fontSize: 18}}>
                  50
                </Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderColor: 'yellow',
                  backgroundColor: '#F1F1F1',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 15,
                  alignItems: 'center',
                }}
                onPress={() => handleOptionPress(100)}>
                <Text
                  style={{color: '#757575', fontWeight: '700', fontSize: 18}}>
                  100
                </Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderColor: 'yellow',
                  backgroundColor: '#F1F1F1',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 15,
                  alignItems: 'center',
                }}
                onPress={() => handleOptionPress(200)}>
                <Text
                  style={{color: '#757575', fontWeight: '700', fontSize: 18}}>
                  200
                </Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderColor: 'yellow',
                  backgroundColor: '#F1F1F1',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 15,
                  alignItems: 'center',
                }}
                onPress={() => handleOptionPress(100)}>
                <Text
                  style={{color: '#757575', fontWeight: '700', fontSize: 18}}>
                  100
                </Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{padding: 20}}>
            <Text style={{color: '#757575', fontStyle: 'italic', fontSize: 15}}>
              * Quy đổi: 1 FToken = 1000 VNĐ
            </Text>
            <Text style={{color: '#757575', fontStyle: 'italic', fontSize: 15}}>
              * Tối thiểu là 50 và tối đa là 1000
            </Text>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <Text>Chọn phương thức thanh toán</Text>
          </View>
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
            <View
              style={{
                padding: 13,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#e0e0e0',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <RadioGroup
                initialValue={selectedPaymentMethod}
                onValueChange={handlePaymentMethod}
                style={{flexDirection: 'row'}}>
                <RadioButton
                  value={'male'}
                  label={'Thanh toán với VNPAY'}
                  color={appColors.blue}
                />
              </RadioGroup>
              <Image
                source={require('@/assets/images/logo/logo_vnpay.png')}
                style={{
                  resizeMode: 'cover',
                  backgroundColor: '#fff',
                }}
              />
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
              onPress={handlePayment}
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
