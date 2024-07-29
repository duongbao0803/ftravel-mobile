import React, {useEffect, useState} from 'react';
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
import {router} from 'expo-router';
import {Money4, EyeSlash, Eye, Coin} from 'iconsax-react-native';
import {formatDate, formateTime} from '@/utils/formatDate';
import useWalletService from '@/services/walletService';
import useAuthService from '@/services/authService';
import AntDesign from '@expo/vector-icons/AntDesign';
import {FontAwesome6} from '@expo/vector-icons';
import {appInfo} from '@/constants/appInfoStyles';
import NotFound from '@/assets/images/logo/—Pngtree—not found_5408094.png';
import InTransaction from '@/assets/images/icon/in-transaction-icon.png';
import OutTransaction from '@/assets/images/icon/out-transaction-icon.png';

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
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const handleFilterPress = (filter: React.SetStateAction<string>) => {
    setActiveFilter(filter);
  };
  const [isShowBalance, setIsShowBalance] = useState<boolean>(false);
  const {balanceData, useTransactionQuery} = useWalletService(queryClient);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  const {data: transactions, refetch} = useTransactionQuery(1, balanceData?.id);

  useEffect(() => {
    const fetchData = async () => {
      filterTransactions();
      await refetch();
      setIsLoadingTransactions(false);
    };

    fetchData();
  }, [activeFilter, transactions]);

  const toggleBalanceVisibility = () => {
    setIsShowBalance(!isShowBalance);
  };

  const filterTransactions = () => {
    if (activeFilter === 'Tất cả') {
      setFilteredTransactions(transactions);
    } else if (activeFilter === 'Tiền vào') {
      setFilteredTransactions(
        transactions.filter(
          (transaction: {[x: string]: string}) =>
            transaction['transaction-type'] === 'IN',
        ),
      );
    } else if (activeFilter === 'Tiền ra') {
      setFilteredTransactions(
        transactions.filter(
          (transaction: {[x: string]: string}) =>
            transaction['transaction-type'] === 'OUT',
        ),
      );
    }
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
        <View>
          {item.status === 'SUCCESS' ? (
            <AntDesign name="checkcircle" size={15} color="#46e065" />
          ) : (
            <FontAwesome6 name="spinner" size={15} color="#1CBCD4" />
          )}
        </View>
        <View style={styles.transactionAmountContainer}>
          {item['transaction-type'] === 'IN' ? (
            item.status === 'SUCCESS' && (
              <Text
                style={
                  styles.transactionAmountPlusText
                }>{`+ ${item.amount}`}</Text>
            )
          ) : (
            <Text
              style={styles.transactionAmountText}>{`- ${item.amount}`}</Text>
          )}
          <Coin size="18" color="#FFC700" variant="Bulk" />
        </View>
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
                  : require('@/assets/images/logo/logo_user.jpg')
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
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity onPress={() => handleFilterPress('Tất cả')}>
              <Text
                style={[
                  styles.historyFilter,
                  activeFilter === 'Tất cả' && styles.activeFilter,
                ]}>
                Tất cả
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterPress('Tiền vào')}>
              <Text
                style={[
                  styles.historyFilterPlus,
                  activeFilter === 'Tiền vào' && styles.activeFilterPlus,
                ]}>
                Tiền vào
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterPress('Tiền ra')}>
              <Text
                style={[
                  styles.historyFilterMinus,
                  activeFilter === 'Tiền ra' && styles.activeFilterMinus,
                ]}>
                Tiền ra
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoadingTransactions ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size="large" color="#1CBCD4" />
          </View>
        ) : filteredTransactions && filteredTransactions.length === 0 ? (
          // <View
          //   style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

          <View style={styles.noData}>
            <Image source={NotFound} style={styles.notFound}></Image>
            <Text
              style={{
                color: '#d1cece',
              }}>
              Chưa có giao dịch
            </Text>
          </View>
        ) : (
          // </View>
          <FlatList
            data={filteredTransactions}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
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
    resizeMode: 'cover',
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
    marginTop: 10,
    color: '#1CBCD4',
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderColor: 'transparent',
    fontWeight: 'semibold',
    textAlign: 'center',
    width: 70,
    fontSize: 14,
  },
  historyFilterPlus: {
    marginTop: 10,
    color: 'green',
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderColor: 'transparent',
    fontWeight: 'semibold',
    textAlign: 'center',
    width: 70,
    fontSize: 14,
  },
  historyFilterMinus: {
    marginTop: 10,
    color: 'red',
    borderBottomWidth: 2,
    borderColor: 'transparent',
    fontWeight: 'semibold',
    paddingBottom: 5,
    textAlign: 'center',
    width: 70,
    fontSize: 14,
  },
  activeFilter: {
    borderColor: '#1CBCD4',
    fontWeight: 'bold',
  },
  activeFilterPlus: {
    borderColor: 'green',
    fontWeight: 'bold',
  },
  activeFilterMinus: {
    borderColor: 'red',
    fontWeight: 'bold',
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
    marginBottom: 15,
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
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 30,
  },
  transactionAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

  noData: {
    flex: 1,
    justifyContent: 'center',
    height: appInfo.sizes.HEIGHT * 0.7,
    alignItems: 'center',
  },
  notFound: {
    height: 180,
    width: 300,
    resizeMode: 'cover',
    borderRadius: 100,
  },
});

export default Wallet;
