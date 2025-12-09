import { useUser } from '@/context/UserContext';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Ingresa tu correo y contraseña');
      return;
    }

    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error(error);
      let msg = 'Error al iniciar sesión.';
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        msg = 'Correo o contraseña incorrectos.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'El formato del correo no es válido.';
      }
      Alert.alert('Error', msg);
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Bienvenido</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Contraseña"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity 
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Feather 
                    name={isPasswordVisible ? "eye" : "eye-off"} 
                    size={20} 
                    color="#9CA3AF" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Acceder</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerLink}>Registrarme</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.disclaimerContainer}>
              <Feather name="info" size={16} color="#4B5563" style={styles.disclaimerIcon} />
              <Text style={styles.disclaimerText}>
                MindUni es una herramienta de apoyo emocional. No sustituye la terapia ni el tratamiento psicológico profesional.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centra todo el contenido horizontalmente
    paddingBottom: 20,
  },
  headerContainer: {
    marginBottom: 24,
    width: 309, // Ancho fijo para alinear con los inputs
  },
  title: {
    fontFamily: 'Rufina-Bold',
    fontSize: 40,
    color: '#374151',
    textAlign: 'left', // Alineado a la izquierda
  },
  formContainer: {
    width: 309, // Ancho fijo solicitado
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B898CA',
    paddingHorizontal: 16,
    paddingVertical: 12, // Ajuste para altura cómoda
    height: 56, // Altura fija para consistencia
    fontFamily: 'Rufina-Regular',
    fontSize: 16,
    color: '#374151', // Color del texto ingresado (asumido oscuro para contraste)
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B898CA',
    height: 56,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Rufina-Regular',
    fontSize: 16,
    color: '#374151',
  },
  eyeIcon: {
    padding: 4,
  },
  button: {
    backgroundColor: '#B898CA',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
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
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: 'Rufina-Regular', // Asumido regular para el texto base
    fontSize: 16,
    color: '#6B7280', // Asumido gris para contraste
  },
  registerLink: {
    fontFamily: 'Rufina-Bold',
    fontSize: 16,
    color: '#B898CA',
  },
  disclaimerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 10,
    marginTop: 30,
    width: 309,
  },
  disclaimerIcon: {
    marginRight: 8,
  },
  disclaimerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#4B5563',
    flex: 1,
    lineHeight: 14,
  },
});

