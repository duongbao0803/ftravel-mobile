import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import useWalletService from '@/services/useWalletService';
import {router, useRouter} from 'expo-router';
import {Money4, EyeSlash, Eye, Coin} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useQueryClient} from 'react-query';
import InTransaction from '@/assets/images/icon/in-transaction-icon.png';
import OutTransaction from '@/assets/images/icon/out-transaction-icon.png';
import {formatDate, formateTime} from '@/utils/formatDate';

export interface Transaction {
  id: number;
  'wallet-id': number;
  'transaction-type': string;
  amount: number;
  description: string;
  'transaction-date': string | Date;
  status: string;
  'create-date': string | Date;
  'update-date'?: string | Date;
  'is-deleted': boolean;
}

const Wallet = () => {
  const queryClient = useQueryClient();

  const [isShowBalance, setIsShowBalance] = useState<boolean>(false);
  const {balanceData, fetchTransaction} = useWalletService(queryClient);
  const [transactions, setTransactions] = useState<Transaction[]>();

  const toggleBalanceVisibility = () => {
    setIsShowBalance(!isShowBalance);
  };

  console.log('check balanceData', balanceData?.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchTransaction(1, balanceData?.id);
        setTransactions(res);
        console.log('res', res);
      } catch (err) {
        console.error('err', err.response);
      }
    };
    fetchData();
  }, [balanceData?.id]);

  console.log('cehck', transactions);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/logo/logo_ftravel.png')}
              style={styles.logo}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>FTravel Pay</Text>

              <View style={styles.balanceContainer}>
                <Coin size="18" color="#FFC700" variant="Bulk" />
                {isShowBalance ? (
                  <Text style={styles.balanceText}>
                    {balanceData && balanceData['account-balance']}
                  </Text>
                ) : (
                  <Text style={styles.hiddenBalance}>*****</Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={toggleBalanceVisibility}
            style={styles.eye}>
            {isShowBalance ? (
              <EyeSlash size={22} color="#fff" variant="Bold" />
            ) : (
              <Eye size={22} color="#fff" variant="Bold" />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => router.push('ChargeMoney')}>
              <View style={styles.button}>
                <Money4 size="18" color="#1CBCD4" variant="Bold" />
                <Text style={styles.buttonText}>Nạp tiền</Text>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.transactionHistory}>
          <Text style={styles.historyTitle}>Lịch sử giao dịch</Text>
          <Text style={styles.historyFilter}>Tất cả</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {transactions &&
            transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <View key={index} style={styles.transactionItem}>
                <View style={styles.transactionDetail}>
                  <Image
                    source={
                      transaction['transaction-type'] === 'IN'
                        ? require('@/assets/images/icon/in-transaction-icon.png')
                        : require('@/assets/images/icon/out-transaction-icon.png')
                    }
                    style={styles.transactionIcon}
                  />
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionText}>
                      {transaction.description}
                    </Text>
                    <Text style={styles.transactionTime}>
                      {formatDate(transaction['transaction-date'])} {''}
                      {formateTime(transaction['transaction-date'])}
                    </Text>
                  </View>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.transactionAmountText}>
                    {`+ ${transaction.amount}`}
                  </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            ))}

          {/* <View style={styles.transactionItem}>
            <View style={styles.transactionDetail}>
              <Image
                source={require('@/assets/images/logo/logo_wallet_payment.png')}
                style={styles.transactionIcon}
              />
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionText}>
                  Nạp tiền vào ví từ VNPAY
                </Text>
                <Text style={styles.transactionTime}>18:16 - 23/06/2024</Text>
              </View>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={styles.transactionAmountText}>+ 100 </Text>
              <Coin size="18" color="#FFC700" variant="Bulk" />
            </View>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
  },
  header: {
    backgroundColor: '#1CBCD4',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  titleContainer: {
    marginLeft: 10,
    gap: 5,
  },
  title: {
    color: '#fff',
    fontWeight: 'semibold',
    fontSize: 18,
  },
  balanceContainer: {
    flexDirection: 'row',
  },
  balanceText: {
    color: '#fff',
    fontWeight: 'semibold',
    fontSize: 18,
  },
  hiddenBalance: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#dadada',
  },
  button: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#1CBCD4',
    fontWeight: 'bold',
  },
  transactionHistory: {
    marginTop: 15,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404040',
  },
  historyFilter: {
    color: '#1CBCD4',
    borderBottomWidth: 2,
    borderColor: '#1CBCD4',
    fontWeight: 'semibold',
    textAlign: 'center',
    width: 80,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    marginTop: 10,
  },
  scrollContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  transactionItem: {
    borderRadius: 10,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  transactionDetail: {
    flex: 2,
    flexDirection: 'row',
    gap: 10,
  },
  transactionIcon: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#e7e7e7',
    width: 55,
    height: 55,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  transactionInfo: {
    marginLeft: 10,
    gap: 15,
  },
  transactionText: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionTime: {
    fontSize: 14,
    color: '#757575',
  },
  transactionAmount: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  transactionAmountText: {
    fontWeight: 'bold',
  },
  eye: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default Wallet;
