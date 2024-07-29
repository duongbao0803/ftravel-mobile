import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {router} from 'expo-router';
import WebView from 'react-native-webview';
import {useQueryClient} from 'react-query';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';
import {Coin} from 'iconsax-react-native';
import {SectionComponent} from '@/components/custom';
import {appColors} from '@/constants/appColors';
import {appInfo} from '@/constants/appInfoStyles';
import useWalletService from '@/services/walletService';
import {ChargeToken} from '@/types/wallet.types';
import {getQueryParams} from '@/utils/getQueryParams';
import useTransaction from '@/hooks/useTransaction';
import {CustomError} from '@/types/error.types';

const ChargeMoney = () => {
  const queryClient = useQueryClient();
  const {balanceData, chargeTokenItem} = useWalletService(queryClient);
  const [vnpUrl, setVnpUrl] = useState<string>('');
  const setTransaction = useTransaction(state => state.setTransaction);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [amount, setAmount] = useState('');

  const handleOptionPress = (value: number) => {
    const limitedValue = Math.max(1, Math.min(value, 999));
    setAmount(limitedValue.toString());
  };

  const handlePaymentMethod = (paymentMethod: React.SetStateAction<string>) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const handlePayment = async () => {
    const amountValue = +amount;
    if (amountValue < 50 || amountValue > 1000) {
      ToastAndroid.show(
        'Số lượng phải nằm trong khoảng từ 50 đến 1000',
        ToastAndroid.CENTER,
      );
      return;
    }
    if (!selectedPaymentMethod) {
      ToastAndroid.show(
        'Vui lòng chọn phương thức thanh toán',
        ToastAndroid.CENTER,
      );
      return;
    }
    try {
      const formValues: ChargeToken = {
        'recharge-amount': amountValue,
        'payment-method': selectedPaymentMethod,
      };
      const res = await chargeTokenItem(formValues);
      if (res.data && res.data['return-url']) {
        setVnpUrl(res.data['return-url']);
      } else {
        ToastAndroid.show('URL không hợp lệ', ToastAndroid.CENTER);
      }
    } catch (error) {
      const err = error as CustomError;
      if (err.response && err.response.data && err.response.data) {
        ToastAndroid.show(
          `${err.response.data.errors.PaymentMethod[0]}`,
          ToastAndroid.CENTER,
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {vnpUrl ? (
        <WebView
          source={{uri: vnpUrl}}
          onNavigationStateChange={e => {
            const params = getQueryParams(e.url);
            setTransaction(params);
            if (params?.vnp_ResponseCode === '00') {
              queryClient.invalidateQueries('balances');
              router.push({pathname: 'PaymentSuccess', params: {amount}});
              setVnpUrl('');
            } else if (params?.vnp_ResponseCode === '24') {
              router.push('PaymentFailure');
              setVnpUrl('');
            }
          }}
        />
      ) : (
        <SectionComponent styles={styles.section}>
          <View style={styles.balanceContainer}>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceText}>Số dư ví:</Text>
              <View style={styles.balanceAmountContainer}>
                <Text style={styles.balanceAmount}>
                  {balanceData && balanceData['account-balance']}
                </Text>
                <Coin size="18" color="#FFC700" variant="Bulk" />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nhập số FToken muốn nạp"
                onChangeText={text => setAmount(text)}
                value={amount}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionPress(50)}>
                <Text style={styles.optionButtonText}>50</Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionPress(100)}>
                <Text style={styles.optionButtonText}>100</Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionPress(200)}>
                <Text style={styles.optionButtonText}>200</Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionPress(500)}>
                <Text style={styles.optionButtonText}>500</Text>
                <Coin size="15" color="#FFC700" variant="Bulk" />
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                * Quy đổi: 1 FToken = 1000 VNĐ
              </Text>
              <Text style={styles.infoText}>
                * Tối thiểu là 50 và tối đa là 1000
              </Text>
            </View>
            <View style={styles.paymentMethodContainer}>
              <Text>Chọn phương thức thanh toán</Text>
              <View style={styles.radioGroupContainer}>
                <RadioGroup
                  initialValue={selectedPaymentMethod}
                  onValueChange={handlePaymentMethod}
                  style={styles.radioGroup}>
                  <RadioButton
                    value={'VNPAY'}
                    label={'Thanh toán với VNPAY'}
                    color={appColors.blue}
                  />
                </RadioGroup>
                <Image
                  source={require('@/assets/images/logo/logo_vnpay.png')}
                  style={styles.logo}
                />
              </View>
            </View>
          </View>
          <View style={styles.confirmButtonContainer}>
            <TouchableOpacity
              onPress={handlePayment}
              style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </SectionComponent>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flex: 1,
  },
  balanceContainer: {
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  balanceRow: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  balanceAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    color: '#FFC700',
    fontWeight: 'bold',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: appInfo.sizes.WIDTH * 0.9,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    paddingLeft: 10,
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: appInfo.sizes.WIDTH * 0.9,
  },
  optionButton: {
    flexDirection: 'row',
    borderColor: 'yellow',
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#757575',
    fontWeight: '700',
    fontSize: 18,
  },
  infoContainer: {
    padding: 20,
  },
  infoText: {
    color: '#757575',
    fontStyle: 'italic',
    fontSize: 15,
  },
  paymentMethodContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
  },
  radioGroupContainer: {
    marginTop: 10,
    padding: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioGroup: {
    flexDirection: 'row',
  },
  logo: {
    resizeMode: 'cover',
    backgroundColor: '#fff',
  },
  confirmButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
    padding: 10,
  },
  confirmButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#1CBCD4',
    borderRadius: 10,
  },
  confirmButtonText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
});

export default ChargeMoney;
