import useWalletService from '@/services/useWalletService';
import {router} from 'expo-router';
import {Money4, EyeSlash, Eye, Coin} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useQueryClient} from 'react-query';
import InTransaction from '@/assets/images/icon/in-transaction-icon.png';
import OutTransaction from '@/assets/images/icon/out-transaction-icon.png';
import {formatDate, formateTime} from '@/utils/formatDate';
import useAuthService from '@/services/useAuthService';

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

const Wallet: React.FC = React.memo(() => {
  const queryClient = useQueryClient();

  const {userInfo} = useAuthService();
  const [isShowBalance, setIsShowBalance] = useState<boolean>(false);
  const {balanceData, useTransactionQuery} = useWalletService(queryClient);

  const {data: transactions, isLoading: isLoadingTransactions} =
    useTransactionQuery(1, balanceData?.id);

  const toggleBalanceVisibility = () => {
    setIsShowBalance(!isShowBalance);
  };

  const renderItem = ({item, index}: {item: Transaction; index: number}) => (
    <View
      style={[
        styles.transactionItem,
        index % 2 === 1 ? {backgroundColor: '#F7FAFF'} : null,
      ]}>
      <View style={styles.transactionDetail}>
        <View style={styles.imageContainer}>
          <Image
            source={
              item['transaction-type'] === 'IN' ? InTransaction : OutTransaction
            }
            style={styles.transactionIcon}
          />
        </View>

        <View style={styles.transactionInfo}>
          <Text style={styles.transactionText}>{item.description}</Text>
          <Text style={styles.transactionTime}>
            {formatDate(item['transaction-date'])} {''}
            {formateTime(item['transaction-date'])}
          </Text>
        </View>
      </View>
      <View style={styles.transactionAmount}>
        {item['transaction-type'] === 'IN' ? (
          <Text
            style={styles.transactionAmountPlusText}>{`+ ${item.amount}`}</Text>
        ) : (
          <Text style={styles.transactionAmountText}>{`- ${item.amount}`}</Text>
        )}
        <Coin size="18" color="#FFC700" variant="Bulk" />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={
                userInfo?.['avatar-url'] && userInfo?.['avatar-url']
                  ? {uri: userInfo?.['avatar-url']}
                  : require('@/assets/images/logo/logo_app.png')
              }
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
        {isLoadingTransactions ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#1CBCD4" />
          </View>
        ) : (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
});

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
    padding: 5,
    borderRadius: 10,
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
    borderColor: '#e7e7e7',
    width: 30,
    height: 30,
    resizeMode: 'cover',
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
  transactionAmountPlusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  transactionAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  eye: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Wallet;
