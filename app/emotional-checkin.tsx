import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Emociones
const EMOTIONS = [
  { id: 'very-happy', icon: require('../assets/images/very-happy.png'), label: 'Muy feliz' },
  { id: 'happy', icon: require('../assets/images/happy.png'), label: 'Feliz' },
  { id: 'serious', icon: require('../assets/images/serious.png'), label: 'Serio' },
  { id: 'sad', icon: require('../assets/images/sad.png'), label: 'Triste' },
  { id: 'cry', icon: require('../assets/images/cry.png'), label: 'Llorando' },
];

export default function EmotionalCheckinScreen() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selectedEmotion) {
      Alert.alert('Selección requerida', 'Por favor selecciona cómo te sientes hoy.');
      return;
    }
    // Aquí se guardaría en el historial
    console.log('Emoción seleccionada:', selectedEmotion);
    
    // Navegar al Home (Tabs)
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¿Cómo te sientes hoy?</Text>
        
        <View style={styles.emotionsContainer}>
          {EMOTIONS.map((emotion) => (
            <TouchableOpacity 
              key={emotion.id} 
              onPress={() => setSelectedEmotion(emotion.id)}
              style={[
                styles.emotionButton,
                selectedEmotion === emotion.id && styles.emotionButtonSelected
              ]}
              activeOpacity={0.7}
            >
              <Image source={emotion.icon} style={styles.emotionIcon} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.button, !selectedEmotion && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={!selectedEmotion}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: 'Rufina-Bold',
    fontSize: 40,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 60,
    marginTop: -40,
  },
  emotionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 80,
    width: '100%',
  },
  emotionButton: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'transparent',
    backgroundColor: '#F9FAFB',
  },
  emotionButtonSelected: {
    borderColor: '#B898CA',
    backgroundColor: '#F3E8FF',
    transform: [{ scale: 1.1 }],
  },
  emotionIcon: {
    width: 52,
    height: 52,
  },
  button: {
    backgroundColor: '#B898CA',
    borderRadius: 12,
    height: 56,
    width: '100%',
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
  buttonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
