import { Tabs } from 'expo-router';
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#B898CA',
        tabBarInactiveTintColor: '#0D0D0D',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 80,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: Platform.OS === 'ios' ? 30 : 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Bold', // Fallback for SemiBold
          fontSize: 10,
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('../../assets/images/home-icon.png')} 
              style={{ width: 20, height: 20, tintColor: color }} 
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused }) => (
            <View style={styles.chatButtonContainer}>
              <View style={styles.chatButtonCircle}>
                <Image 
                  source={require('../../assets/images/logo.png')} 
                  style={{ width: '100%', height: '100%' }} 
                  resizeMode="cover"
                />
              </View>
            </View>
          ),
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Bold',
            fontSize: 11,
            marginTop: 0, // Empujar el texto hacia abajo
          },
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Proceso',
          tabBarIcon: ({ color }) => (
            <Image 
              source={require('../../assets/images/progreso.png')} 
              style={{ width: 20, height: 20, tintColor: color }} 
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  chatButtonContainer: {
    position: 'absolute',
    top: -58, // Subir más el botón
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonCircle: {
    width: 80, // Más grande
    height: 80,
    borderRadius: 40, // Completamente redondo
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden', // Para asegurar que la imagen respete el borde redondeado
  },
});
