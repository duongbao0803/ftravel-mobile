import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {Card} from 'react-native-paper';
import {SectionComponent} from '@/components/custom';
import {router} from 'expo-router';

const ElectronicTicket: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Card style={styles.card}>
          <View style={styles.qrContainer}>
            <QRCode value="https://www.facebook.com/duongbao0803" size={250} />
            <Text style={styles.qrText}>
              Quét mã QR này tại trạm trước khi lên xe
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Text style={styles.label}>FTRAVEL</Text>
              <Text style={styles.value}>TK_989372</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Hồ Chí Minh</Text>
              <Text style={styles.value}>Cần Thơ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>5:00</Text>
              <Text style={styles.value}>11:00</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>27/05/2024</Text>
              <Text style={styles.value}>27/05/2024</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Khách hàng</Text>
              <Text style={styles.value}>Dương Bảo</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>duongbao2k3@gmail.com</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Loại vé</Text>
              <Text style={styles.value}>VIP</Text>
            </View>
          </View>
        </Card>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <SectionComponent styles={styles.sectionComponent}>
            <TouchableOpacity
              onPress={() => router.push('TicketDetail')}
              style={styles.button}>
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
    marginBottom: 20,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
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
});

export default ElectronicTicket;
