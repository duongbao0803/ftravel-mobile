import {create} from 'zustand';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import {AuthState} from '@/types/auth.types';

const useAuthen = create<AuthState>(set => ({
  fcmToken: null,
  setFcmToken: (fcmToken: string) => set({fcmToken}),
  isAuthenticated: false,
  role: null,
  setRole: (role: string) => set({role}),
  loginMethod: null,
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({isLoading}),
  login: (method: 'google' | 'normal') => {
    set({isAuthenticated: true, loginMethod: method, isLoading: false});
    router.replace('/HomeScreen');
  },

  logoutGoogle: async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.clear();
      set({
        isAuthenticated: false,
        loginMethod: null,
        fcmToken: null,
        role: null,
      });
      router.replace('/InputEmail');
    } catch (error) {}
  },

  logoutNormal: async () => {
    try {
      await AsyncStorage.clear();
      set({
        isAuthenticated: false,
        loginMethod: null,
        fcmToken: null,
        role: null,
      });
      router.replace('/InputEmail');
    } catch (error) {}
  },

  logout: async () => {
    try {
      const {loginMethod} = useAuthen.getState();
      if (loginMethod === 'google') {
        await useAuthen.getState().logoutGoogle();
      } else {
        await useAuthen.getState().logoutNormal();
      }
    } catch (error) {}
  },
}));

export default useAuthen;
