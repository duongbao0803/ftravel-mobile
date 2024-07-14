import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {appColors} from '@/constants/appColors';
import 'firebase/storage';
import {
  Bus,
  Calendar,
  CardReceive,
  Coin,
  EmptyWallet,
  Level,
  Location,
} from 'iconsax-react-native';
import CarouselComponent from '@/components/custom/CarouselComponent';
import {Picker, DateTimePicker} from 'react-native-ui-lib';

import {useRouter} from 'expo-router';
import useAuthService from '@/services/useAuthService';
import useWalletService from '@/services/useWalletService';
import {useQueryClient} from 'react-query';
import useTripService from '@/services/useTripService';
import useTripStore from '@/hooks/useTripStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {sendFcm} from '@/api/authApi';
import {formatDateTrip} from '@/utils/formatDate';
import useServiceStore from '@/hooks/useServiceStore';

export interface CityInfo {
  id: number;
  name: string;
  code?: number;
  'is-deleted'?: boolean;
}

const HomeScreen: React.FC = React.memo(() => {
  const queryClient = useQueryClient();
  const {userInfo} = useAuthService();
  const {balanceData} = useWalletService(queryClient);
  const router = useRouter();

  const [selectedDeparture, setSelectedDeparture] = useState<number>();
  const [selectedDestnation, setSelectedDestination] = useState<number>();
  const [startDate, setStartDate] = useState();
  const {fetchTrips} = useTripService();
  const setSeatCode = useServiceStore(state => state.setSeatCode);
  const setTotal = useServiceStore(state => state.setTotal);
  const {setTrip, setDeparture, setDestination} = useTripStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fcmToken = await AsyncStorage.getItem('fcmToken');
        if (fcmToken) {
          const formValues = {email: userInfo?.email, 'fcm-token': fcmToken};
          await sendFcm(formValues);
        }
      } catch (err) {}
    };

    fetchData();
  }, [userInfo]);

  useEffect(() => {
    setSeatCode('');
    setTotal(0);
  }, []);

  const fetchData = async () => {
    if (!selectedDeparture) {
      ToastAndroid.show('Vui lòng nhập điểm đi', ToastAndroid.CENTER);
      return;
    }
    if (!selectedDestnation) {
      ToastAndroid.show('Vui lòng nhập điểm đến', ToastAndroid.CENTER);
      return;
    }
    if (!startDate) {
      ToastAndroid.show('Vui lòng nhập ngày đi', ToastAndroid.CENTER);
      return;
    }
    try {
      const res = await fetchTrips(
        selectedDeparture,
        selectedDestnation,
        formatDateTrip(startDate),
      );
      if (res && res.status === 200) {
        setTrip(res.data);
        router.push({
          pathname: 'ListTrip',
          params: {selectedDeparture, selectedDestnation},
        });
      }
    } catch (err) {
      setTrip([]);
      router.push('ListTrip');
    }
  };

  const handleChangeStartDate = (date: React.SetStateAction<Date>) => {
    setStartDate(date);
  };

  const handleDepartureChange = (item: {value: string} | undefined) => {
    if (item) {
      const selectedLabel = cities.find(city => city.id === +item)?.name;
      setDeparture(selectedLabel);
      setSelectedDeparture(item as any);
    }
  };

  const handleDestinationChange = (item: {value: string} | undefined) => {
    if (item) {
      const selectedLabel = cities.find(city => city.id === +item)?.name;
      setDestination(selectedLabel);
      setSelectedDestination(item as any);
    }
  };

  const cities = [
    {
      code: 79,
      'create-date': '2024-06-01T14:27:41.57',
      id: 1,
      'is-deleted': false,
      name: 'Hồ Chí Minh',
      'update-date': null,
    },
    {
      code: 77,
      'create-date': '2024-06-01T14:29:10.147',
      id: 2,
      'is-deleted': false,
      name: 'Vũng Tàu',
      'update-date': null,
    },
    {
      code: 92,
      'create-date': '2024-06-15T15:11:01.303',
      id: 15,
      'is-deleted': false,
      name: 'Cần Thơ',
      'update-date': null,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <SectionComponent styles={styles.header_container}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <View style={styles.logoContainer}>
                <Image
                  source={
                    userInfo && userInfo['avatar-url']
                      ? {uri: userInfo['avatar-url']}
                      : require('@/assets/images/logo/logo_user.jpg')
                  }
                  style={styles.logo_header}
                />
              </View>
              <View>
                <Text style={styles.greeting}>Xin chào,</Text>
                <Text style={styles.name}>
                  {userInfo && userInfo['full-name']}
                </Text>
              </View>
            </View>
            <View style={styles.marginBottom}>
              <Image
                source={require('@/assets/images/logo/logo_app_v2.png')}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.options}>
            <View style={styles.options1}>
              <View style={styles.border_Ftoken}>
                <Text style={styles.ftokenText}>FToken</Text>
                <View style={styles.token}>
                  <Coin size="15" color="#1CC8DC" variant="Bulk" />
                  <Text style={styles.ftokenValue}>
                    {balanceData && balanceData['account-balance']}
                  </Text>
                </View>
              </View>
              <View style={styles.charge_money}>
                <View style={styles.charge_money_child}>
                  <CardReceive size="20" color="#646464" variant="Bold" />
                  <TouchableOpacity onPress={() => router.push('ChargeMoney')}>
                    <Text style={styles.chargeText}>Nạp tiền</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.line_between} />
                <View style={styles.wallet}>
                  <EmptyWallet size="20" color="#646464" variant="Bold" />
                  <TouchableOpacity onPress={() => router.push('Wallet')}>
                    <Text style={styles.walletValue}>Ví của tôi</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SectionComponent>

        <SectionComponent styles={styles.main_container}>
          <View style={styles.pickTrip}>
            <View style={styles.title}>
              <Bus size="25" color="#617382" variant="Bold" />
              <Text style={{fontSize: 18}}>Đi thôi nào</Text>
            </View>
            <View style={styles.location}>
              <Level size="25" style={styles.marginTop} color="#1CBCD4" />
              <View style={styles.departure}>
                <Picker
                  placeholder="Điểm đến"
                  floatingPlaceholder
                  value={selectedDeparture}
                  onChange={item =>
                    handleDepartureChange(item as unknown as {value: string})
                  }
                  topBarProps={{title: 'Chọn điểm đến'}}>
                  {cities?.map(city => (
                    <Picker.Item
                      key={city.id}
                      value={city.id}
                      label={city.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.pickDestination}>
              <Location
                size="25"
                style={styles.marginTop}
                color="red"
                variant="Bold"
              />
              <View style={styles.destination}>
                <Picker
                  placeholder="Điểm đến"
                  floatingPlaceholder
                  value={selectedDestnation}
                  onChange={item =>
                    handleDestinationChange(item as unknown as {value: string})
                  }
                  topBarProps={{title: 'Chọn điểm đến'}}>
                  {cities?.map(city => (
                    <Picker.Item
                      key={city.id}
                      value={city.id}
                      label={city.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.time}>
              <Calendar
                size="25"
                style={styles.marginTop}
                color="#1CBCD4"
                variant="Bold"
              />
              <View style={styles.datePicker}>
                <DateTimePicker
                  placeholder="Ngày đi"
                  mode="date"
                  dateFormat="DD/MM/YYYY"
                  value={startDate}
                  onChange={handleChangeStartDate}
                  placeholderTextColor="#b1b1b1"
                  style={styles.marginTop}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => fetchData()}
            style={styles.button_login}>
            <Text style={styles.button_text_login}>Tìm kiếm</Text>
          </TouchableOpacity>
        </SectionComponent>
        <SectionComponent styles={styles.route_container}>
          <Text style={styles.banner_text}>Tuyến đường phổ biến</Text>
          <CarouselComponent />
        </SectionComponent>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header_container: {
    flex: 1.1,
    borderBottomRightRadius: 55,
    borderBottomLeftRadius: 55,
  },
  main_container: {
    flex: 1.5,
    marginTop: 15,
  },
  route_container: {
    flex: 1,
    marginTop: 40,
  },
  container_section: {
    height: appInfo.sizes.HEIGHT * 0.8,
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 50,
  },
  container_footer: {
    height: appInfo.sizes.HEIGHT * 0.2,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingBottom: 25,
    paddingLeft: 50,
    paddingRight: 50,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },

  image: {
    height: 100,
    width: 100,
    resizeMode: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'gray',
  },
  button_text_confirm: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  button_confirm: {
    backgroundColor: '#1CBCD4',
    height: 50,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  container_form: {
    flexDirection: 'row',
    padding: 25,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 25,
  },
  content: {
    flex: 2,
    flexDirection: 'row',
    fontSize: 16,
  },
  inputContent: {
    flex: 2,
    flexDirection: 'row',
    fontSize: 16,
    margin: -4,
  },
  button_login: {
    backgroundColor: '#1CBCD4',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dfe2e6',
    marginHorizontal: 30,
  },
  button_text_login: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },

  header: {
    backgroundColor: appColors.blue,
    flex: 1.3,
    borderBottomRightRadius: 55,
    borderBottomLeftRadius: 55,
    zIndex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 80,
    objectFit: 'contain',
  },
  logoContainer: {
    borderRadius: 100,
  },
  avatar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginBottom: 15,
  },
  options: {
    flex: 1,
    marginHorizontal: 30,
    borderRadius: 20,
    marginTop: -35,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 99,
    shadowColor: '#000000',
    elevation: 5,
  },
  options1: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo_header: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 100,
  },
  border_Ftoken: {
    borderBottomWidth: 0.4,
    borderColor: '#617382',
    paddingVertical: 5,
  },
  ftokenText: {
    color: '#617382',
    fontSize: 16,
  },
  ftokenValue: {
    fontSize: 15,
    color: '#007F92',
    fontWeight: 'bold',
  },
  token: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  charge_money: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 10,
  },
  charge_money_child: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  line_between: {
    backgroundColor: '#646464',
    width: 0.5,
    height: 40,
    overflow: 'hidden',
  },
  wallet: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  walletValue: {
    fontSize: 15,
    color: '#617382',
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#beeff3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 7,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 10,
    overflow: 'hidden',
  },
  banner_text: {
    fontSize: 18,
    paddingHorizontal: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#757575',
  },
  datePicker: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
    width: '100%',
  },
  calendar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 10,
    overflow: 'hidden',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 10,
    overflow: 'hidden',
  },
  destination: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
    width: '100%',
  },
  pickDestination: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    gap: 10,
    overflow: 'hidden',
  },
  departure: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
    width: '100%',
  },
  greeting: {
    fontSize: 14,
    color: '#fff',
  },
  name: {
    fontSize: 16,
    color: '#fff',
  },
  marginTop: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 15,
  },
  marginTopv2: {
    marginTop: 20,
  },
  datePickerChild: {
    marginTop: 10,
    paddingTop: 7,
  },
  chargeText: {
    fontSize: 15,
    color: '#617382',
  },
  pickTrip: {
    paddingHorizontal: 30,
    paddingVertical: 25,
  },
});

export default HomeScreen;
