import AvatarSelectorModal from '@/components/AvatarSelectorModal';
import { useUser } from '@/context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ImageSourcePropType,
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

// Mismo array que en el modal para poder identificar el índice
const AVATARS = [
  require('../assets/images/avatar_1.png'),
  require('../assets/images/avatar_2.png'),
  require('../assets/images/avatar_3.png'),
  require('../assets/images/avatar_4.png'),
  require('../assets/images/avatar_5.png'),
  require('../assets/images/avatar_6.png'),
  require('../assets/images/avatar_7.png'),
  require('../assets/images/avatar_8.png'),
  require('../assets/images/avatar_9.png'),
];

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useUser();
  
  // Estados para los campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Estado para el avatar
  const [selectedAvatar, setSelectedAvatar] = useState<ImageSourcePropType>(require('../assets/images/avatar_4.png')); // Avatar por defecto
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  const handleRegister = async () => {
    // Validación básica
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // Identificar el ID del avatar seleccionado
      const avatarIndex = AVATARS.indexOf(selectedAvatar);
      // Si no se encuentra (por alguna razón), usamos el default (índice 3 -> avatar_4)
      const avatarId = avatarIndex !== -1 ? `avatar_${avatarIndex + 1}` : 'avatar_4';

      await register(email, password, name, avatarId);
      
      Alert.alert('¡Bienvenido!', 'Tu cuenta ha sido creada con éxito.');
      router.replace('/emotional-checkin');
    } catch (error: any) {
      console.error(error);
      let msg = 'No se pudo crear la cuenta.';
      if (error.code === 'auth/email-already-in-use') msg = 'Este correo ya está registrado.';
      if (error.code === 'auth/weak-password') msg = 'La contraseña debe tener al menos 6 caracteres.';
      Alert.alert('Error', msg);
    }
  };

  const handleLoginNavigation = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Crea tu cuenta</Text>
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={() => setIsAvatarModalVisible(true)} activeOpacity={0.8}>
              <View style={styles.avatarWrapper}>
                <Image 
                  source={selectedAvatar} 
                  style={styles.avatar} 
                  resizeMode="contain"
                />
                <View style={styles.editIconContainer}>
                  <MaterialIcons name="edit" size={14} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>

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
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Registrarme</Text>
            </TouchableOpacity>

            <View style={styles.loginLinkContainer}>
              <TouchableOpacity onPress={handleLoginNavigation}>
                <Text style={styles.loginLinkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* Avatar Selector Modal */}
      <AvatarSelectorModal
        visible={isAvatarModalVisible}
        onClose={() => setIsAvatarModalVisible(false)}
        onSelectAvatar={setSelectedAvatar}
      />
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
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 20,
    width: 309,
  },
  title: {
    fontFamily: 'Rufina-Bold',
    fontSize: 40,
    color: '#374151',
    textAlign: 'left',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000000',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: 309,
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
    paddingVertical: 12,
    height: 56,
    fontFamily: 'Rufina-Regular',
    fontSize: 16,
    color: '#374151',
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
  loginLinkContainer: {
    alignItems: 'center',
  },
  loginLinkText: {
    fontFamily: 'Rufina-Bold',
    fontSize: 16,
    color: '#B898CA',
  },
});
