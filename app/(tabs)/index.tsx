import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Datos simulados
const GOALS = [
  { id: '1', title: 'Hacer un registro emocional', icon: require('../../assets/images/Frasco.png') },
  { id: '2', title: 'Beber agua', icon: require('../../assets/images/Agua.png') },
  { id: '3', title: 'Salir a caminar', icon: require('../../assets/images/Caminar.png') },
  { id: '4', title: 'Leer 10 minutos', icon: require('../../assets/images/Leer.png') },
  { id: '5', title: 'Escuchar una meditación', icon: require('../../assets/images/meditar.png') },
];

const TOOLS = [
  { 
    id: 'diario', 
    title: 'Diario', 
    subtitle: 'Expresa todo lo que quieras', 
    icon: require('../../assets/images/diario.png'), 
    color: 'rgba(248, 255, 51, 0.22)', // #F8FF33 22%
    textColor: '#000000',
    subtitleColor: '#6B7280'
  },
  { 
    id: 'crisis', 
    title: 'Crisis', 
    subtitle: 'Ayuda inmediata', 
    icon: require('../../assets/images/crisis.png'), 
    color: 'rgba(251, 162, 168, 0.55)', // #FBA2A8 55%
    textColor: '#000000',
    subtitleColor: '#6B7280'
  },
  { 
    id: 'musica', 
    title: 'Música', 
    subtitle: 'Calma y Focus', 
    icon: require('../../assets/images/Musica.png'), 
    color: 'rgba(162, 202, 152, 0.58)', // #A2CA98 58%
    textColor: '#000000',
    subtitleColor: '#6B7280'
  },
  { 
    id: 'rutinas', 
    title: 'Rutinas', 
    subtitle: 'Mindfulness y TCC', 
    icon: require('../../assets/images/rutinas.png'), 
    color: 'rgba(98, 53, 92, 0.51)', // #62355C 51%
    textColor: '#000000', // User requested black title? Spec said "Texto Rutinas... color 6B7280" for subtitle. I'll stick to black title for consistency unless specified.
    subtitleColor: '#6B7280'
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { name, avatar } = useUser();
  const [completedGoals, setCompletedGoals] = useState<string[]>([]);

  // Obtener solo el primer nombre
  const firstName = name.split(' ')[0];

  const toggleGoal = (id: string) => {
    setCompletedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* NavBar Estático */}
      <View style={styles.navBar}>
        <View style={styles.navLeft}>
          <View>
            <Text style={styles.greeting}>Hola, {firstName}</Text>
            <Text style={styles.subGreeting}>Es un buen día para empezar</Text>
          </View>
        </View>
        <View style={styles.navRight}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image source={avatar} style={styles.avatar} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/* Botón de Ansiedad */}
        <View style={styles.anxietyContainer}>
          <TouchableOpacity style={styles.anxietyButton}>
            <Text style={styles.anxietyButtonText}>Ansiedad</Text>
             <Text style={styles.anxietyButtonIcon}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Racha */}
        <View style={styles.streakContainer}>
          <View style={styles.streakLeft}>
            <View style={styles.streakIconContainer}>
              <Image source={require('../../assets/images/fire.png')} style={styles.fireIcon} resizeMode="contain" />
            </View>
            <View style={styles.streakTextContainer}>
              <Text style={styles.streakTitle}>¡Vas genial!</Text>
              <Text style={styles.streakSubtitle}>5 días seguidos cuidando de ti.</Text>
            </View>
          </View>
          <View style={styles.streakRight}>
            <Text style={styles.streakDaysCount}>5</Text>
            <Text style={styles.streakDaysLabel}>DÍAS</Text>
          </View>
        </View>

        {/* Objetivos de Hoy */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Objetivos de hoy</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.goalsScroll}>
            {GOALS.map((goal) => (
              <TouchableOpacity 
                key={goal.id} 
                style={[
                  styles.goalCard,
                  completedGoals.includes(goal.id) && styles.goalCardCompleted
                ]}
                onPress={() => toggleGoal(goal.id)}
                activeOpacity={0.7}
              >
                <Image source={goal.icon} style={styles.goalIcon} resizeMode="contain" />
                <Text style={styles.goalText}>{goal.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Herramientas de Bienestar */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Herramientas de Bienestar</Text>
          <View style={styles.toolsGrid}>
            {TOOLS.map((tool) => (
              <TouchableOpacity 
                key={tool.id} 
                style={[styles.toolCard, { backgroundColor: tool.color }]}
                activeOpacity={0.8}
              >
                <View style={styles.toolContent}>
                  <View style={styles.toolHeader}>
                    <Image source={tool.icon} style={styles.toolIcon} resizeMode="contain" />
                    <Text style={[styles.toolTitle, { color: tool.textColor }]}>{tool.title}</Text>
                  </View>
                  <Text style={[styles.toolSubtitle, { color: tool.subtitleColor }]}>{tool.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Espacio extra para el bottom bar */}
        <View style={{ height: 80 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  navBar: {
    height: 89,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24, // Aumentado para evitar cortes
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    marginTop: 10,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Permitir que ocupe espacio disponible
  },
  greeting: {
    fontFamily: 'Rufina-Bold',
    fontSize: 30,
    color: '#000000',
  },
  subGreeting: {
    fontFamily: 'Rufina-Bold',
    fontSize: 13,
    color: '#CDCDCD',
    marginTop: 4,
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Alinear a la derecha
    minWidth: 50, // Asegurar espacio mínimo para el avatar
  },
  anxietyContainer: {
    marginBottom: 16,
    alignItems: 'flex-start', // Alinear a la izquierda
  },
  anxietyButton: {
    backgroundColor: '#B898CA',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  anxietyButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  anxietyButtonIcon: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  avatar: {
    width: 48,
    height: 46,
    borderRadius: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  streakContainer: {
    width: '100%',
    height: 90,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  streakIconContainer: {
    width: 62,
    height: 60,
    borderRadius: 31,
    backgroundColor: '#FFFFFF', // Image shows white bg with shadow? No, spec says "Circulo... color F8FF33". But image shows a white circle with fire inside? Wait.
    // Spec: "Icono de racha: Circulo de tamaño 62 x 60 y color F8FF33."
    // Image: Looks like a white circle with a yellow glow/shadow? Or maybe the circle IS yellow.
    // I will follow spec: F8FF33 (Yellow).
    // Wait, looking closely at the image, the fire is inside a circle that looks yellowish/white gradient?
    // I'll stick to spec: F8FF33.
    backgroundColor: '#FFFBEB', // A very light yellow/white to match image better? Or spec F8FF33?
    // Spec says F8FF33. I will use F8FF33 but maybe with opacity if it's too strong?
    // Actually, let's use F8FF33 as requested.
    // Wait, looking at the image again, the circle behind the fire is very light.
    // But I must follow "color F8FF33".
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#F8FF33',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  fireIcon: {
    width: 26,
    height: 34,
  },
  streakTextContainer: {
    flex: 1,
  },
  streakTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 16,
    color: '#000000',
  },
  streakSubtitle: {
    fontFamily: 'Rufina-Regular',
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
  },
  streakRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  streakDaysCount: {
    fontFamily: 'Rufina-Bold',
    fontSize: 24,
    color: '#F59E0B', // Orange color from image
  },
  streakDaysLabel: {
    fontFamily: 'Rufina-Bold',
    fontSize: 10,
    color: '#9CA3AF',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
    textAlign: 'left',
  },
  goalsScroll: {
    flexGrow: 0,
    overflow: 'visible',
  },
  goalCard: {
    width: 121,
    height: 137,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  goalCardCompleted: {
    backgroundColor: '#E8F5E9', // Light green background
    borderColor: '#C8E6C9',     // Light green border
    opacity: 1,                 // Removed opacity to make the color visible
  },
  goalIcon: {
    width: 55,
    height: 55,
    marginBottom: 16,
  },
  goalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 14,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  toolCard: {
    width: (width - 40 - 12) / 2,
    height: 115,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolContent: {
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  toolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toolTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  toolSubtitle: {
    fontFamily: 'Poppins-Bold', // Using Bold as requested for "Medium" fallback
    fontSize: 12,
    marginTop: 4,
  },
  toolIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
});
