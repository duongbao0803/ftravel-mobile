import {create} from 'zustand';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import {AuthState} from '@/types/auth.types';

const useAuthen = create<AuthState>(set => ({
  logoutGoogle: async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.clear(), set({isAuthenticated: false});
      router.push('/InputEmail');

      console.log('Đăng xuất thành công');
    } catch (error) {
      console.error(error);
    }
  },

  fcmToken: null,
  setFcmToken: (fcmToken: string) => set({fcmToken}),
  isAuthenticated: !!AsyncStorage.getItem('accessToken'),
  role: null,
  setRole: (role: string) => set({role}),
  login: () => {
    set({isAuthenticated: true});
    router.push('/HomeScreen');
  },
}));

export default useAuthen;
