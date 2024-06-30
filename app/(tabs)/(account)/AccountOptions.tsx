import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import useAuthen from '@/hooks/useAuthen';
import {useNavigation, useRouter} from 'expo-router';
import {
  ArrowRight2,
  Bus,
  EmptyWallet,
  Logout,
  Notification,
  TicketExpired,
} from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const AccountOptions = () => {
  const router = useRouter();
  const logoutGoogle = useAuthen(state => state.logoutGoogle);

  const navigation = useNavigation();

  const handlePressNoti = () => {
    navigation.navigate('(noti)');
  };
  const handlePressTicket = () => {
    navigation.navigate('(ticket)');
  };

  const handleLogout = () => {
    logoutGoogle();
    navigation.navigate('InputEmail');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => router.push('InfoUser')}>
          <SectionComponent styles={styles.sectionComponent}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('@/assets/images/logo/logo_app_v2.png')}
                style={styles.avatar}
              />
            </View>
            <View style={styles.optionsContainer}>
              <View style={styles.nameDetailContainer}>
                <View style={styles.nameDetailContainerChild}>
                  <Text style={styles.name}>Dương Bảo</Text>
                  <Text style={styles.sizeEmail}>duongbao2k3@gmail.com</Text>
                </View>
                <ArrowRight2 size="18" color="#1CBCD4" />
              </View>
            </View>
          </SectionComponent>
        </TouchableOpacity>
        <View style={styles.otherOption}>
          <TouchableOpacity>
            <SectionComponent styles={styles.otherOptionContainer}>
              <View style={styles.walletIcon}>
                <EmptyWallet size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={styles.walletDetail}>
                <View style={styles.walletDetailChild}>
                  <Text style={styles.sizeWallet}>Ví của tôi</Text>
                  <ArrowRight2 size="18" color="#1CBCD4" />
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressTicket}>
            <SectionComponent styles={styles.otherOptionContainer}>
              <View style={styles.walletIcon}>
                <TicketExpired size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={styles.walletDetail}>
                <View style={styles.history}>
                  <Text style={styles.sizeWallet}>Lịch sử mua vé</Text>
                  <ArrowRight2 size="18" color="#1CBCD4" />
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressNoti}>
            <SectionComponent styles={styles.otherOptionContainer}>
              <View style={styles.walletIcon}>
                <Notification size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={styles.walletDetail}>
                <View style={styles.history}>
                  <Text style={styles.sizeWallet}>Thông báo</Text>
                  <ArrowRight2 size="18" color="#1CBCD4" />
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <SectionComponent styles={styles.otherOptionContainer}>
              <View style={styles.walletIcon}>
                <Logout size="25" color="#1CBCD4" variant="Bold" />
              </View>
              <View style={styles.walletDetail}>
                <View style={styles.history}>
                  <Text style={styles.sizeWallet}>Đăng xuất</Text>
                </View>
              </View>
            </SectionComponent>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCC8C8',
    backgroundColor: '#fff',
    padding: 20,
  },
  avatarContainer: {
    width: appInfo.sizes.WIDTH * 0.2,
    height: appInfo.sizes.WIDTH * 0.2,
    borderWidth: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    objectFit: 'contain',
    borderRadius: 100,
  },
  optionsContainer: {
    width: appInfo.sizes.WIDTH * 0.7,
  },
  nameDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameDetailContainerChild: {
    flexDirection: 'column',
    gap: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sizeEmail: {
    fontSize: 15,
  },
  otherOption: {
    marginTop: 20,
  },
  otherOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#CCC8C8',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 0.4,
  },
  walletIcon: {
    flex: 1,
  },
  walletDetail: {
    flex: 6,
  },
  walletDetailChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sizeWallet: {
    fontSize: 18,
  },
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AccountOptions;
