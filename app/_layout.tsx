import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  useNavigationState,
} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  useColorScheme,
} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Stack} from 'expo-router';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="height">
          <Stack>
            <Stack.Screen name="(auth)" options={{headerShown: false}} />
            <Stack.Screen name="(tabs)" options={{headerShown: false}} />
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen
              name="PaymentSuccess"
              options={{
                headerTitleAlign: 'center',
                headerStyle: {backgroundColor: '#1CBCD4'},
                headerTintColor: '#fff',
                headerTitle: 'Thông tin thanh toán',
              }}
            />
            <Stack.Screen
              name="PaymentFailure"
              options={{
                headerTitleAlign: 'center',
                headerStyle: {backgroundColor: '#1CBCD4'},
                headerTintColor: '#fff',
                headerTitle: 'Thông tin thanh toán',
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </KeyboardAvoidingView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
