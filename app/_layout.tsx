import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {KeyboardAvoidingView} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
