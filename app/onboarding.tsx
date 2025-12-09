import { auth, db } from '@/config/firebaseConfig';
import { useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OPTIONS = [
  { id: 'anxiety', label: 'Ansiedad General', emoji: '😰' },
  { id: 'depression_mild', label: 'Tristeza o Depresión Leve', emoji: '☁️' },
  { id: 'academic_stress', label: 'Estrés Académico', emoji: '📚' },
  { id: 'breakup', label: 'Ruptura Amorosa', emoji: '💔' },
  { id: 'self_esteem', label: 'Autoestima', emoji: '✨' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedOption) {
      Alert.alert('Selección requerida', 'Por favor selecciona una opción para continuar.');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          emotionalProfile: selectedOption
        });
        // Navegar a Emotional Checkin
        router.replace('/emotional-checkin');
      } else {
        Alert.alert('Error', 'No se encontró la sesión del usuario.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Hubo un problema al guardar tu selección.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: typeof OPTIONS[0] }) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedOption === item.id && styles.optionButtonSelected
      ]}
      onPress={() => setSelectedOption(item.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.optionEmoji}>{item.emoji}</Text>
      <Text style={[
        styles.optionLabel,
        selectedOption === item.id && styles.optionLabelSelected
      ]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Queremos ayudarte mejor</Text>
        <Text style={styles.subtitle}>
          Cuéntanos, ¿qué es lo que más te preocupa en este momento? Esto nos ayudará a recomendarte las actividades ideales.
        </Text>

        <FlatList
          data={OPTIONS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={[styles.continueButton, (!selectedOption || loading) && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={!selectedOption || loading}
        >
          <Text style={styles.continueButtonText}>{loading ? 'Guardando...' : 'Continuar'}</Text>
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
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontFamily: 'Rufina-Bold',
    fontSize: 24,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#6B7280', // Gris
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  listContainer: {
    gap: 16,
    paddingBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 60,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    borderColor: '#B898CA',
    backgroundColor: '#F3E8FF',
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#374151',
  },
  optionLabelSelected: {
    color: '#B898CA',
  },
  continueButton: {
    backgroundColor: '#B898CA',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});
