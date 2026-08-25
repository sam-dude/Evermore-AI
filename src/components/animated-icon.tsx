import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export function AnimatedSplashOverlay() {
  return null;
}

export function AnimatedIcon() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/evertap-logo.jpeg')}
        style={styles.logo}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A1628',
    borderColor: '#1E3A5F',
    borderWidth: 1,
  },
  logo: {
    width: 80,
    height: 80,
  },
});
