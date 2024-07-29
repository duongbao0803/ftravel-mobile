import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRouter} from 'expo-router';
import {SectionComponent} from '@/components/custom';
import useTransaction from '@/hooks/useTransaction';

const PaymentFailure: React.FC = () => {
  const router = useRouter();
  const transaction = useTransaction(state => state.transaction);

  return (
    <SafeAreaView style={{flex: 1}}>
      <SectionComponent styles={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Image
              source={require('@/assets/images/icon/failure_icon.png')}
              style={styles.image}
            />
            <Text style={styles.titleText}>Thanh toán không thành công</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.detailText}>
                Giao dịch của bạn không thành công
              </Text>
              <Text style={styles.detailText}>Vui lòng thử lại sau</Text>
            </View>

            <Text style={styles.detailText}>Lí do: Số dư không đủ</Text>
            <Text style={styles.detailText}>
              Mã giao dịch: {transaction?.code}
            </Text>
          </View>
        </View>
        <View style={styles.confirmButtonContainer}>
          <SectionComponent styles={styles.confirmButtonWrapper}>
            <TouchableOpacity
              onPress={() => router.replace('HomeScreen')}
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
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
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

export default PaymentFailure;
