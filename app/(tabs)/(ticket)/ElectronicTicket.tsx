import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Card} from 'react-native-paper';
import {SectionComponent} from '@/components/custom';
import useTicketStore from '@/hooks/useTicketStore';
import {ArrowRight} from 'iconsax-react-native';
import {formatDate, formateTime} from '@/utils/formatDate';
import useAuthService from '@/services/authService';
import {useNavigation} from '@react-navigation/native';

const ElectronicTicket: React.FC = () => {
  const {ticketInfo} = useTicketStore();
  const {userInfo} = useAuthService();
  const navigation = useNavigation();

  const ticketId = ticketInfo?.['ticket-id'].toString();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <View style={styles.qrContainer}>
              <QRCode value={ticketId} size={250} />
              <Text style={styles.qrText}>
                Quét mã QR này tại trạm trước khi lên xe
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.row1}>
                <View style={styles.imageContainer}>
                  <Image
                    source={
                      ticketInfo?.['buscompany-img'] &&
                      ticketInfo['buscompany-img']
                        ? {uri: ticketInfo['buscompany-img']}
                        : require('@/assets/images/logo/logo_app.png')
                    }
                    style={styles.logo}
                  />
                  <Text style={styles.label}>
                    {ticketInfo?.['buscompany-name']}
                  </Text>
                </View>

                <Text style={styles.value}>{ticketInfo?.ticketCode}</Text>
              </View>
              <View style={styles.row2}>
                <View style={styles.row2Child}>
                  <Text style={styles.label}>
                    {ticketInfo?.['start-point-name']}
                  </Text>
                  <Text style={styles.value}>
                    {ticketInfo?.['end-point-name']}
                  </Text>
                </View>
                <View style={styles.row2Child}>
                  <Text style={styles.label}>
                    {formateTime(ticketInfo?.['estimate-start-date'])}
                  </Text>
                  <ArrowRight size="50" color="#1CBCD4" />
                  <Text style={styles.value}>
                    {formateTime(ticketInfo?.['estimate-end-date'])}
                  </Text>
                </View>
                <View style={styles.row2Child}>
                  <Text style={styles.label}>
                    {formatDate(ticketInfo?.['estimate-start-date'])}
                  </Text>
                  <Text style={styles.value}>
                    {formatDate(ticketInfo?.['estimate-end-date'])}
                  </Text>
                </View>
              </View>
              <View style={styles.row3}>
                <View style={styles.row3Child}>
                  <Text>Khách hàng</Text>
                  <Text style={styles.valueChild}>
                    {userInfo?.['full-name']}
                  </Text>
                </View>
                <View style={styles.row3Child}>
                  <Text>Email</Text>
                  <Text style={styles.valueChild}>{userInfo?.email}</Text>
                </View>
                <View style={styles.row3Child}>
                  <Text>Loại vé</Text>
                  {ticketInfo?.['ticket-type-name'] === 'VIP' ? (
                    <Text style={styles.ticketTypeVip}>VIP</Text>
                  ) : (
                    <Text style={styles.ticketTypeNormal}>NORMAL</Text>
                  )}
                </View>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <SectionComponent styles={styles.sectionComponent}>
            <TouchableOpacity onPress={goBack} style={styles.button}>
              <Text style={styles.buttonText}>Trở về</Text>
            </TouchableOpacity>
          </SectionComponent>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  qrContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  qrText: {
    marginVertical: 15,
    textAlign: 'center',
    color: '#666',
  },
  infoContainer: {
    marginTop: 10,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: '#dbd5d5',
  },
  row2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: '#dbd5d5',
  },
  row2Child: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row3: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 15,
    gap: 15,
  },
  row3Child: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  value: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 17,
  },
  valueChild: {
    color: '#333',
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
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  ticketTypeVip: {
    color: '#ffbf00e9',
    fontWeight: 'bold',
  },
  ticketTypeNormal: {
    color: '#6494e2',
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default ElectronicTicket;
