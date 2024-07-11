import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import useTransaction from '@/hooks/useTransaction';
import {useRoute} from '@react-navigation/native';
import {useRouter} from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const route = useRoute();
  const transaction = useTransaction(state => state.transaction);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SectionComponent styles={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/icon/success_icon.png')}
              style={styles.image}
            />
            <Text style={styles.titleText}>Tất cả đã xong</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Bạn vừa thanh toán thành công {transaction['total-price']} FToken
              cho đơn hàng 0D_20242705_001.
            </Text>
            <Text style={styles.detailText}>
              Mã giao dịch: {transaction?.code}
            </Text>
            <Text style={styles.detailText}>
              Xem chi tiết tại trang giao dịch.
            </Text>
          </View>
        </View>
        <View style={styles.confirmButtonContainer}>
          <SectionComponent styles={styles.confirmButtonWrapper}>
            <TouchableOpacity
              onPress={() => router.navigate('HomeScreen')}
              style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Trở về trang chủ</Text>
            </TouchableOpacity>
          </SectionComponent>
        </View>
      </SectionComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
    height: appInfo.sizes.HEIGHT * 0.4,
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 110,
    height: 110,
    objectFit: 'contain',
    borderRadius: 100,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 40,
  },
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  detailText: {
    textAlign: 'center',
    fontSize: 18,
  },
  confirmButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
    padding: 10,
  },
  confirmButtonWrapper: {
    width: '100%',
    backgroundColor: '#1CBCD4',
    borderRadius: 10,
  },
  confirmButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
});

export default PaymentSuccess;