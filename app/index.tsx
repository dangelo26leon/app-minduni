import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Definimos los tipos de navegación para esta pantalla
type RootStackParamList = {
  Welcome: undefined;
  login: undefined;
};

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('login' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        
        {/* Center Content (Logo + Text) */}
        <View style={styles.centerContent}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>MINDUNI</Text>
            <Text style={styles.subtitle}>
              Tu espacio seguro para sentirte acompañado.
            </Text>
          </View>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 280,
    height: 280,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -40, // Subimos el texto para acercarlo al logo
  },
  title: {
    fontSize: 48,
    color: '#B898CA',
    fontFamily: 'Rufina-Bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    fontFamily: 'Rufina-Bold',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: '80%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#B898CA',
    width: '100%',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
});
