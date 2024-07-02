import {create} from 'zustand';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import {AuthState} from '@/types/auth.types';

const useTransaction = create(set => ({
  transaction: null,
  setTransaction: (transaction: object) => set({transaction}),
}));

export default useTransaction;
