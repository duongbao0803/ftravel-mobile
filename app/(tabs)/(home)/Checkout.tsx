import {SectionComponent} from '@/components/custom';
import useServiceStore from '@/hooks/useServiceStore';
import {router} from 'expo-router';
import {Bus, CloseCircle, Coin, Crown1, Vibe} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Checkout = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const total = useServiceStore(state => state.total);
  const [contactInfo, setContactInfo] = useState({
    name: 'Dương Tôn Bảo',
    phone: '0909113114',
    email: 'duongbao2k3@gmail.com',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (key: string, value: string) => {
    setContactInfo({...contactInfo, [key]: value});
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text>Thông tin chuyến đi</Text>
          </View>
          <View style={styles.ticketInfo}>
            <View style={styles.ticketInfoName}>
              <View style={styles.logoNameContainer}>
                <Image
                  source={require('@/assets/images/logo/logo_ftravel.png')}
                  style={styles.logo}
                />
                <View style={styles.logoTextContainer}>
                  <Text style={styles.name}>FTRAVEL BUS</Text>
                  <Text style={styles.seatCode}>Mã ghế: A11</Text>
                </View>
              </View>
              <View style={styles.ticketTypeContainer}>
                <Text style={styles.ticketType}>VIP</Text>
                <Crown1 size={16} color="#ffbf00e9" variant="Bold" />
              </View>
            </View>
            <View style={styles.tripDetailsContainer}>
              <View style={styles.tripColumn}>
                <View>
                  <Text style={styles.tripTime}>5:00</Text>
                  <Text style={styles.tripDate}>27/05/2024</Text>
                </View>
                <View>
                  <Text style={styles.tripTime}>11:00</Text>
                  <Text style={styles.tripDate}>27/05/2024</Text>
                </View>
              </View>
              <View style={styles.tripSeparator}>
                <Vibe size={20} color="#1CBCD4" />
                <View style={styles.verticalLine} />
                <Bus size={20} color="#1CBCD4" />
              </View>
              <View style={styles.tripColumn}>
                <View>
                  <Text style={styles.tripPlace}>Hồ Chí Minh</Text>
                  <Text style={styles.tripDetail}>Bến xe Miền Tây</Text>
                </View>
                <View>
                  <Text style={styles.tripPlace}>Cần Thơ</Text>
                  <Text style={styles.tripDetail}>Bến Ninh Kiều</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.ticketInfo}>
            <Text style={styles.stationTitle}>
              Thông tin trạm - dịch vụ đi kèm
            </Text>
            <View style={styles.stationContainer}>
              <View style={styles.circle} />
              <View style={styles.line} />
              <View style={styles.stationTextContainer}>
                <Text style={styles.stationName}>Hồ Chí Minh</Text>
                <Text style={styles.stationDetail}>Bến xe Miền Tây</Text>
                <View style={styles.serviceContainer}>
                  <Text style={styles.service}>Nước suối x2</Text>
                  <Text style={styles.service}>Bánh mì x1</Text>
                </View>
              </View>
            </View>
            <View style={styles.stationContainer}>
              <View style={styles.circle} />
              <View style={styles.line} />
              <View style={styles.stationTextContainer}>
                <Text style={styles.stationName}>Tiền Giang</Text>
                <Text style={styles.stationDetail}>Trạm dừng Mỹ Tho</Text>
              </View>
            </View>
            <View style={styles.stationContainer}>
              <View style={styles.circle} />
              <View style={styles.stationTextContainer}>
                <Text style={styles.stationName}>Cần Thơ</Text>
                <Text style={styles.stationDetail}>Bến Ninh Kiều</Text>
              </View>
            </View>
          </View>
          <View style={styles.ticketInfo}>
            <View style={styles.contactInfoHeader}>
              <Text style={styles.contactInfoTitle}>Thông tin liên hệ</Text>
              <TouchableOpacity onPress={handleEditToggle}>
                <Text style={styles.editText}>
                  {isEditing ? (
                    <CloseCircle size={19} color="#FF8A65" />
                  ) : (
                    'Chỉnh sửa'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            {isEditing ? (
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  value={contactInfo.name}
                  onChangeText={text => handleChange('name', text)}
                  placeholder="Họ tên"
                />
                <TextInput
                  style={styles.input}
                  value={contactInfo.phone}
                  onChangeText={text => handleChange('phone', text)}
                  placeholder="Điện thoại"
                  keyboardType="phone-pad"
                />
                <TextInput
                  style={styles.input}
                  value={contactInfo.email}
                  onChangeText={text => handleChange('email', text)}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>
            ) : (
              <View style={styles.form}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Họ tên</Text>
                  <Text style={styles.value}>{contactInfo.name}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Điện thoại</Text>
                  <Text style={styles.value}>{contactInfo.phone}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{contactInfo.email}</Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        {!isKeyboardVisible && (
          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <View>
                <Text style={styles.footerTextItem}>Tổng tiền</Text>
              </View>
              <View style={styles.footerTotal}>
                <Text style={styles.footerTextTotal}>{total}</Text>
                <Coin size={20} color="#1CBCD4" variant="Bulk" />
              </View>
            </View>

            <View style={styles.footerButton}>
              <SectionComponent styles={styles.sectionComponent}>
                <TouchableOpacity
                  onPress={() => router.push('Checkout')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Thanh toán với FToken</Text>
                </TouchableOpacity>
              </SectionComponent>
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollView: {
    marginHorizontal: 15,
    flex: 1,
    marginTop: 10,
  },
  titleContainer: {
    paddingLeft: 5,
    fontSize: 17,
    fontWeight: 'bold',
  },
  ticketInfo: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  ticketInfoName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#909090',
  },
  logoNameContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  logoTextContainer: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  seatCode: {
    fontSize: 13,
    color: '#909090',
  },
  ticketTypeContainer: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: '#ffd90045',
    color: '#ffbf00e9',
    fontWeight: 'bold',
    gap: 5,
  },
  ticketType: {
    color: '#ffbf00e9',
    fontWeight: 'bold',
  },
  tripDetailsContainer: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#F4F4F4',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripColumn: {
    flexDirection: 'column',
    gap: 40,
  },
  tripTime: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tripDate: {
    fontSize: 13,
    color: '#909090',
  },
  tripSeparator: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  verticalLine: {
    width: 1.5,
    height: 50,
    backgroundColor: '#000000',
  },
  tripPlace: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  tripDetail: {
    fontSize: 13,
    color: '#909090',
  },
  stationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  stationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#909090',
    marginTop: 10,
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#000',
    position: 'absolute',
    left: 9,
    top: 30,
    zIndex: -1,
  },
  stationTextContainer: {
    marginLeft: 10,
  },
  stationName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  stationDetail: {
    fontSize: 13,
    color: '#909090',
  },
  serviceContainer: {
    marginLeft: 20,
  },
  service: {
    fontSize: 13,
    color: '#000',
    lineHeight: 25,
  },
  contactInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  editText: {
    fontWeight: 'bold',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#999',
  },
  value: {
    fontSize: 16,
    color: '#000',
  },
  form: {
    marginTop: 10,
  },
  input: {
    height: 40,
    fontSize: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  footer: {
    backgroundColor: '#fff',
  },
  footerContent: {
    marginHorizontal: 20,
    marginVertical: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerTextItem: {
    color: '#404040',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footerTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  footerTextTotal: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: 20,
  },
  footerButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 25,
    padding: 10,
  },
  sectionComponent: {
    width: '100%',
    backgroundColor: '#1CBCD4',
    borderRadius: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
});

export default Checkout;
