import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProcessScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/progreso.png')} 
          style={styles.icon} 
          resizeMode="contain"
        />
        <Text style={styles.title}>Tu Proceso</Text>
        <Text style={styles.message}>
          Según tus actividades que harás hoy tendrás tu proceso, osea que todavía falta para que tengas tu proceso.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 24,
    tintColor: '#B898CA',
  },
  title: {
    fontFamily: 'Rufina-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
