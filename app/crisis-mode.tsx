import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CIRCLE_SIZE = 250;

export default function CrisisModeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [instruction, setInstruction] = useState('Inhala lentamente...');

  useEffect(() => {
    const breatheAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    breatheAnimation.start();

    const runTextCycle = () => {
      setInstruction('Inhala lentamente...');
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      const holdTimeout = setTimeout(() => {
        setInstruction('Mantén...');
      }, 4000);

      const exhaleTimeout = setTimeout(() => {
        setInstruction('Exhala suavemente...');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 6000);

      return () => {
        clearTimeout(holdTimeout);
        clearTimeout(exhaleTimeout);
      };
    };

    const cleanupFirstRun = runTextCycle();
    const interval = setInterval(runTextCycle, 10000);

    return () => {
      breatheAnimation.stop();
      clearInterval(interval);
      if (cleanupFirstRun) cleanupFirstRun();
    };
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

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
          <Text style={styles.headerBrand}>MindUni</Text>
        </View>
        
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.mainTitle}>MODO CRISIS</Text>

        <View style={styles.circleContainer}>
          <Animated.View 
            style={[
              styles.breathingCircle,
              {
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            <Text style={styles.instructionText}>{instruction}</Text>
          </Animated.View>
        </View>
      </View>
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
    width: 30,
    height: 30,
  },
  headerBrand: {
    fontFamily: 'Rufina-Bold',
    fontSize: 20,
    color: '#000000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 28,
    color: '#000000',
    marginTop: 40,
    marginBottom: 20,
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  breathingCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#B898CA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#B898CA",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  instructionText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
