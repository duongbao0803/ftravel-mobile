import {create} from 'zustand';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const useAuthen = create(set => ({
  logoutGoogle: async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log('Đăng xuất thành công');
    } catch (error) {
      console.error(error);
    }
  },

  fcmToken: null,
  setFcmToken: (fcmToken: string) => set({fcmToken}),
}));

export default useAuthen;
