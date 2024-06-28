import {ButtonComponent, SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
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
import {Link, useNavigation, useRouter} from 'expo-router';

const HomeScreen: React.FC = React.memo(() => {
  const router = useRouter();
  const cities = [
    {label: 'Hà Nội', value: 'hanoi'},
    {label: 'Hồ Chí Minh', value: 'hochiminh'},
    {label: 'Đà Nẵng', value: 'danang'},
    {label: 'Nha Trang', value: 'nhatrang'},
  ];

  const [selectedDeparture, setSelectedDeparture] = useState<string>('');
  const [selectedDestnation, setSelectedDestination] = useState<string>('');

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChangeDate = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
  };
  const handleDepartureChange = (item: {value: string} | undefined) => {
    if (item) {
      setSelectedDeparture(item as any);
    }
  };

  const handleDestinationChange = (item: {value: string} | undefined) => {
    if (item) {
      setSelectedDestination(item as any);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SectionComponent styles={styles.header_container}>
          <View
            style={{
              backgroundColor: appColors.blue,
              flex: 1.3,
              borderBottomRightRadius: 55,
              borderBottomLeftRadius: 55,
              zIndex: 1,
              paddingHorizontal: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                marginBottom: 15,
              }}>
              <View style={{borderRadius: 100}}>
                <Image
                  source={require('@/assets/images/logo/logo_user.jpg')}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: 'contain',
                    borderRadius: 100,
                  }}
                />
              </View>
              <View>
                <Text style={{fontSize: 14, color: '#fff'}}>Xin chào,</Text>
                <Text style={{fontSize: 16, color: '#fff'}}>Dương Bảo</Text>
              </View>
            </View>
            <View style={{marginBottom: 15}}>
              <Image
                source={require('@/assets/images/logo/logo_app_v2.png')}
                style={{
                  width: 80,
                  objectFit: 'contain',
                }}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: 30,
              borderRadius: 20,
              marginTop: -35,
              backgroundColor: '#fff',
              position: 'relative',
              zIndex: 99,
              shadowColor: '#000000',
              elevation: 5,
            }}>
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 5,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}>
              <View
                style={{
                  borderBottomWidth: 0.4,
                  borderColor: '#617382',
                  paddingVertical: 5,
                }}>
                <Text style={{color: '#617382', fontSize: 16}}>FToken</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 2,
                  }}>
                  <Coin size="15" color="#1CC8DC" variant="Bulk" />
                  <Text
                    style={{fontSize: 15, fontWeight: 900, color: '#007F92'}}>
                    999.999
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  overflow: 'hidden',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: 'auto',
                  }}>
                  <CardReceive size="20" color="#646464" variant="Bold" />
                  <Text style={{fontSize: 15, color: '#617382'}}>Nạp tiền</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#646464',
                    width: 0.5,
                    height: 40,
                    overflow: 'hidden',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: 'auto',
                  }}>
                  <EmptyWallet size="20" color="#646464" variant="Bold" />
                  <TouchableOpacity onPress={() => router.push('Wallet')}>
                    <Text style={{fontSize: 15, color: '#617382'}}>
                      Ví của tôi
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SectionComponent>

        <SectionComponent styles={styles.main_container}>
          <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: '#beeff3',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                gap: 7,
              }}>
              <Bus size="25" color="#617382" variant="Bold" />
              <Text style={{fontSize: 18}}>Đi thôi nào</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                gap: 10,
                overflow: 'hidden',
              }}>
              <Level size="25" style={{marginTop: 10}} color="#1CBCD4" />
              <View
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: '#dfdfdf',
                  width: '100%',
                }}>
                <Picker
                  placeholder="Điểm đi"
                  floatingPlaceholder
                  value={selectedDeparture}
                  onChange={item =>
                    handleDepartureChange(item as unknown as {value: string})
                  }
                  topBarProps={{title: 'Chọn thành phố'}}>
                  {cities.map(city => (
                    <Picker.Item
                      key={city.value}
                      value={city.value}
                      label={city.label}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                gap: 10,
                overflow: 'hidden',
              }}>
              <Location
                size="25"
                style={{marginTop: 10}}
                color="red"
                variant="Bold"
              />
              <View
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: '#dfdfdf',
                  width: '100%',
                }}>
                <Picker
                  placeholder="Điểm đến"
                  floatingPlaceholder
                  value={selectedDestnation}
                  onChange={item =>
                    handleDestinationChange(item as unknown as {value: string})
                  }
                  topBarProps={{title: 'Chọn thành phố'}}>
                  {cities.map(city => (
                    <Picker.Item
                      key={city.value}
                      value={city.value}
                      label={city.label}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                gap: 10,
                overflow: 'hidden',
              }}>
              <Calendar
                size="25"
                style={{marginTop: 10}}
                color="#1CBCD4"
                variant="Bold"
              />
              <View
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: '#dfdfdf',
                  width: '100%',
                }}>
                <DateTimePicker
                  placeholder="Ngày đi"
                  mode="date"
                  value={selectedDate}
                  onChange={handleChangeDate}
                  placeholderTextColor="#b1b1b1"
                  style={{
                    marginTop: 10,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 10,
                gap: 10,
                overflow: 'hidden',
              }}>
              <Calendar
                size="25"
                style={{marginTop: 20}}
                color="#1CBCD4"
                variant="Bold"
              />
              <View
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: '#dfdfdf',
                  width: '100%',
                }}>
                <DateTimePicker
                  placeholder="Ngày về"
                  mode="date"
                  value={selectedDate}
                  onChange={handleChangeDate}
                  placeholderTextColor="#b1b1b1"
                  style={{marginTop: 10, paddingTop: 7}}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => router.push('ListTrip')}
            style={styles.button_login}>
            <Text style={styles.button_text_login}>Tìm kiếm</Text>
          </TouchableOpacity>
        </SectionComponent>
        <SectionComponent styles={styles.route_container}>
          <Text
            style={{
              fontSize: 18,
              paddingHorizontal: 30,
              marginBottom: 10,
              fontWeight: 'bold',
              color: '#757575',
            }}>
            Tuyến đường phổ biến
          </Text>
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
  avatar: {
    alignItems: 'center',
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
});

export default HomeScreen;
