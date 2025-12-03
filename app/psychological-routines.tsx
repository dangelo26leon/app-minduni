import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ImageSourcePropType,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MoodTag {
  text: string;
  color: string;
  emojiImage: ImageSourcePropType;
}

interface Routine {
  id: string;
  moodTag: MoodTag;
  title: string;
  subtitle: string;
  duration: string;
  iconImage: ImageSourcePropType;
}

const ROUTINES: Routine[] = [
  {
    id: '1',
    moodTag: {
      text: 'Ansiedad',
      color: '#ECAE80',
      emojiImage: require('../assets/images/serious.png'),
    },
    title: 'Técnica 5-4-3-2-1',
    subtitle: 'Conecta con tus sentidos',
    duration: '3 min',
    iconImage: require('../assets/images/eye.png'),
  },
  {
    id: '2',
    moodTag: {
      text: 'Estrés',
      color: '#FBA2A8',
      emojiImage: require('../assets/images/sad.png'),
    },
    title: 'Escaneo Corporal',
    subtitle: 'Relaja cada músculo',
    duration: '5 min',
    iconImage: require('../assets/images/leaf.png'),
  },
  {
    id: '3',
    moodTag: {
      text: 'Estrés',
      color: '#FBA2A8',
      emojiImage: require('../assets/images/sad.png'),
    },
    title: 'Respiración Consciente',
    subtitle: 'Atención Plena Básica',
    duration: '2 min',
    iconImage: require('../assets/images/brain.png'),
  },
  {
    id: '4',
    moodTag: {
      text: 'Tristeza',
      color: '#7C8CFF', // Azulado/Lila
      emojiImage: require('../assets/images/cry.png'),
    },
    title: 'Técnica RAIN',
    subtitle: 'Acepta tus emociones',
    duration: '4 min',
    iconImage: require('../assets/images/heart.png'),
  },
];

export default function PsychologicalRoutinesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleRoutinePress = (routine: Routine) => {
    console.log('Ir a rutina:', routine.title);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/images/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" 
          />
          <Text style={styles.headerTitle}>Rutinas Psicológicas</Text>
        </View>
        
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.introText}>
          Selecciona una técnica basada en como te sientes ahora.
        </Text>

        <View style={styles.listContainer}>
          {ROUTINES.map((routine) => (
            <View key={routine.id} style={styles.itemContainer}>
              {/* Tag */}
              <View style={[styles.tagContainer, { backgroundColor: routine.moodTag.color }]}>
                <Image source={routine.moodTag.emojiImage} style={styles.tagEmoji} resizeMode="contain" />
                <Text style={styles.tagText}>{routine.moodTag.text}</Text>
              </View>

              {/* Card */}
              <TouchableOpacity 
                style={styles.card} 
                activeOpacity={0.9}
                onPress={() => handleRoutinePress(routine)}
              >
                <View style={styles.cardLeft}>
                  <Image source={routine.iconImage} style={styles.cardIcon} resizeMode="contain" />
                </View>
                <View style={styles.cardCenter}>
                  <Text style={styles.cardTitle}>{routine.title}</Text>
                  <Text style={styles.cardSubtitle}>{routine.subtitle}</Text>
                </View>
                <View style={styles.cardRight}>
                  <Text style={styles.cardDuration}>{routine.duration}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 20,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  introText: {
    fontFamily: 'Rufina-Regular',
    fontSize: 14,
    color: '#9CA3AF',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 22,
  },
  listContainer: {
    paddingHorizontal: 20,
    gap: 24,
  },
  itemContainer: {
    gap: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  tagEmoji: {
    width: 16,
    height: 16,
  },
  tagText: {
    fontFamily: 'Poppins-Bold', // Changed to Bold/Medium as requested "Poppins-Medium" but using Bold as fallback if Medium not loaded
    fontSize: 12,
    color: '#000000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F9FAFB',
  },
  cardLeft: {
    marginRight: 16,
  },
  cardIcon: {
    width: 40,
    height: 40,
  },
  cardCenter: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  cardRight: {
    marginLeft: 8,
  },
  cardDuration: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
});
