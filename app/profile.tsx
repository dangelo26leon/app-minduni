import AvatarSelectorModal from '@/components/AvatarSelectorModal';
import { useUser } from '@/context/UserContext';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const FIRE_ICON = require('../assets/images/fire.png');
const BOOK_ICON = require('../assets/images/book.png');
const MEDITAR_ICON = require('../assets/images/meditar.png');
const PERSON_ICON = require('../assets/images/person.png');
const MOON_ICON = require('../assets/images/moon.png');
const NOTIFICATION_ICON = require('../assets/images/notification.png');
const LANGUAGE_ICON = require('../assets/images/language.png');

export default function ProfileScreen() {
  const router = useRouter();
  const { name, avatar, setAvatar } = useUser();
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  const handleEditAvatar = () => {
    setIsAvatarModalVisible(true);
  };

  const handleAvatarSelect = (newAvatar: ImageSourcePropType) => {
    setAvatar(newAvatar);
    setIsAvatarModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi perfil</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* User Section */}
        <View style={styles.userSection}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handleEditAvatar} activeOpacity={0.9}>
              <Image source={avatar} style={styles.avatar} resizeMode="cover" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={handleEditAvatar}
              activeOpacity={0.8}
            >
              <Feather name="edit-2" size={12} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{name}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {/* Racha */}
          <View style={styles.statCard}>
            <Image source={FIRE_ICON} style={styles.statIcon} resizeMode="contain" />
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>RACHA</Text>
          </View>

          {/* Entradas */}
          <View style={styles.statCard}>
            <Image source={BOOK_ICON} style={styles.statIcon} resizeMode="contain" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>ENTRADAS</Text>
          </View>

          {/* Relax */}
          <View style={styles.statCard}>
            <Image source={MEDITAR_ICON} style={styles.statIcon} resizeMode="contain" />
            <Text style={styles.statNumber}>2h</Text>
            <Text style={styles.statLabel}>RELAX</Text>
          </View>
        </View>

        {/* Cuenta Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
              <Image source={PERSON_ICON} style={styles.menuIcon} resizeMode="contain" />
              <Text style={styles.menuText}>Datos personales</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Ajustes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajustes</Text>
          <View style={styles.settingsContainer}>
            
            {/* Apariencia */}
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <Image source={MOON_ICON} style={styles.menuIcon} resizeMode="contain" />
                <Text style={styles.menuText}>Apariencia</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#000000" />
            </TouchableOpacity>

            {/* Recordatorios */}
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <Image source={NOTIFICATION_ICON} style={styles.menuIcon} resizeMode="contain" />
                <Text style={styles.menuText}>Recordatorios</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#000000" />
            </TouchableOpacity>

            {/* Idioma */}
            <TouchableOpacity style={[styles.settingItem, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <Image source={LANGUAGE_ICON} style={styles.menuIcon} resizeMode="contain" />
                <Text style={styles.menuText}>Idioma</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#000000" />
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>

      <AvatarSelectorModal
        visible={isAvatarModalVisible}
        onClose={() => setIsAvatarModalVisible(false)}
        onSelectAvatar={handleAvatarSelect}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 20,
    color: '#000000',
  },
  userSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // Assuming somewhat circular or oval based on dims
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontFamily: 'Rufina-Bold',
    fontSize: 24,
    color: '#000000',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '30%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Rufina-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 18,
    color: '#000000',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 20,
    height: 20,
  },
  menuText: {
    fontFamily: 'Poppins-Regular', // Assuming Regular for body text
    fontSize: 14,
    color: '#000000',
  },
  settingsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
});
