import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from 'react-native-reanimated';

export default function SplashScreen() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  // Valores compartidos para la animación
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);
  const containerOpacity = useSharedValue(1); // Nuevo valor para la transición de salida

  useEffect(() => {
    // 1. Animación del Logo (Más lenta y suave)
    logoOpacity.value = withTiming(1, { duration: 2500 }); // Aumentado a 2.5s
    logoScale.value = withSpring(1, { 
      damping: 15, 
      stiffness: 50, // Menor rigidez para ser más lento
      mass: 2 // Mayor masa para sentirlo más pesado/lento
    });
    
    // 2. Animación del Texto (Más demorada y pegada al logo)
    textOpacity.value = withDelay(2000, withTiming(1, { duration: 1500 })); // Delay aumentado
    textTranslateY.value = withDelay(2000, withSpring(0, { damping: 20, stiffness: 80 }));

    // Marcar como listo para interacción después de la animación
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handlePress = () => {
    // Solo permitir navegar si la animación de entrada ha avanzado lo suficiente
    // o si el usuario quiere saltarla (opcional, pero aquí esperamos a que termine o casi termine)
    
    // Iniciar transición de salida
    containerOpacity.value = withTiming(0, { duration: 800 }, (finished) => {
      if (finished) {
        runOnJS(router.replace)('/login');
      }
    });
  };

  // Estilos animados
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }]
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }]
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value
  }));

  return (
    <Pressable style={{ flex: 1 }} onPress={handlePress}>
      <Animated.View style={[styles.container, containerAnimatedStyle]}>
        <View style={styles.content}>
          <Animated.Image 
            source={require('../assets/images/MINDUNI_fondo.png')} 
            style={[styles.logo, logoStyle]} 
            resizeMode="contain"
          />
          
          <Animated.View style={[styles.textContainer, textStyle]}>
            <Animated.Text style={styles.title}>MINDUNI</Animated.Text>
            <Animated.Text style={styles.subtitle}>
              Tu espacio seguro para sentirte acompañado.
            </Animated.Text>
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 0,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -40, // Subido más para pegar el texto al logo
  },
  title: {
    fontFamily: 'Rufina-Bold',
    fontSize: 48,
    color: '#B898CA',
    letterSpacing: 2,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
