import {create} from 'zustand';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthen = create(set => ({
  logoutGoogle: async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.clear(), set({isAuthenticated: false});
      console.log('Đăng xuất thành công');
    } catch (error) {
      console.error(error);
    }
  },

  fcmToken: null,
  setFcmToken: (fcmToken: string) => set({fcmToken}),
  isAuthenticated: !!AsyncStorage.getItem('accessToken'),
  login: () => {
    set({isAuthenticated: true});
  },
}));

export default useAuthen;
