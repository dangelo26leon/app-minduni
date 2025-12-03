import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Datos de ejemplo
const FOCUS_PLAYLISTS = [
  {
    id: '1',
    title: 'Lo-fi Study',
    genre: 'Beats suaves',
    image: require('../assets/images/lo-fi study.png'),
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn',
  },
  {
    id: '2',
    title: 'Deep Focus',
    genre: 'Sin distracciones',
    image: require('../assets/images/deep focus.png'),
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ',
  },
];

const RELAX_PLAYLISTS = [
  {
    id: '3',
    title: 'Sonidos de Lluvia',
    subtitle: 'Naturaleza pura • 45 min',
    image: require('../assets/images/Lluvia.png'),
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7ae',
  },
  {
    id: '4',
    title: 'Calma Acústica',
    subtitle: 'Guitarra suave • 1h 20m',
    image: require('../assets/images/Calma.png'),
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXaImRpG7HXqp',
  },
];

export default function MusicSpaceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleOpenPlaylist = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(url);
    }
  };

  const handleSpotifyPress = async () => {
    const url = 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ';
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(url);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Espacio Musical</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity 
          style={styles.spotifyBanner} 
          activeOpacity={0.9}
          onPress={handleSpotifyPress}
        >
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Conecta con tu ritmo</Text>
              <Text style={styles.bannerSubtitle}>
                Seleccionamos sonidos para ayudarte a regular tus emociones.
              </Text>
            </View>
            <Image 
              source={require('../assets/images/spotify.png')} 
              style={styles.spotifyLogo} 
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Para concentrarte</Text>
            <FontAwesome5 name="book" size={20} color="#000" style={styles.sectionIcon} />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {FOCUS_PLAYLISTS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.cardContainer}
                activeOpacity={0.8}
                onPress={() => handleOpenPlaylist(item.spotifyUrl)}
              >
                <View style={styles.cardImageContainer}>
                  <Image source={item.image} style={styles.cardImage} />
                  <View style={styles.playOverlay}>
                    <Ionicons 
                      name="play" 
                      size={20} 
                      color="#1DB954" 
                    />
                  </View>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardGenre}>{item.genre}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Para relajarte</Text>
            <Ionicons name="leaf" size={24} color="#000" style={styles.sectionIcon} />
          </View>

          <View style={styles.verticalList}>
            {RELAX_PLAYLISTS.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.listItem}
                activeOpacity={0.8}
                onPress={() => handleOpenPlaylist(item.spotifyUrl)}
              >
                <Image source={item.image} style={styles.listImage} />
                <View style={styles.listInfo}>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.listSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.listPlayButton}>
                  <Ionicons 
                    name="play" 
                    size={20} 
                    color="#000" 
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
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
  headerTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 20,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  spotifyBanner: {
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 24,
    overflow: 'hidden',
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  bannerTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  spotifyLogo: {
    width: 60,
    height: 60,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 18,
    color: '#000000',
    marginRight: 8,
  },
  sectionIcon: {
    marginTop: 2,
  },
  horizontalList: {
    flexDirection: 'row',
  },
  cardContainer: {
    marginRight: 16,
    width: 150,
  },
  cardImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 16,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  playOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Poppins-Bold', // Usando Bold como solicitado
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  cardGenre: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  verticalList: {
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 12,
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  listInfo: {
    flex: 1,
  },
  listTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  listSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  listPlayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});
