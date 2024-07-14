import useAuthen from '@/hooks/useAuthen';
import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal} from 'react-native';

const LoadingScreen: React.FC = () => {
  const isLoading = useAuthen(state => state.isLoading);

  if (!isLoading) return null;

  return (
    <Modal transparent={true} animationType="none" visible={isLoading}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1CBCD4" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default LoadingScreen;
