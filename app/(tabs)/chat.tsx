import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Assets
const LOGO_ICON = require('../../assets/images/logo.png');
const MIC_ICON = require('../../assets/images/mic.png');
const SEND_ICON = require('../../assets/images/send.png');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hola, estoy aquí para todo.', sender: 'ai' },
  { id: '2', text: '¿Quieres hablar?', sender: 'ai' },
];

const AI_RESPONSES = [
  'Entiendo que te sientas estresado',
  'Cuéntame, ¿Qué pasó?',
  'Estoy aquí para escucharte',
  'Respirar profundo puede ayudar',
  'Tómate un momento para ti',
];

const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, { toValue: 1, duration: 500, useNativeDriver: true, delay }),
          Animated.timing(dot, { toValue: 0.3, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    };

    animate(dot1, 0);
    animate(dot2, 200);
    animate(dot3, 400);
  }, []);

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
    </View>
  );
};

export default function ChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  // Scroll al final cuando llegan mensajes
  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages, isTyping]);

  const renderItem = ({ item }: { item: Message }) => {
    const isAi = item.sender === 'ai';
    return (
      <View style={[styles.messageRow, isAi ? styles.messageRowLeft : styles.messageRowRight]}>
        {isAi && (
          <Image source={LOGO_ICON} style={styles.aiAvatar} resizeMode="contain" />
        )}
        <View
          style={[
            styles.bubble,
            isAi ? styles.bubbleAi : styles.bubbleUser,
          ]}
        >
          <Text style={[styles.messageText, !isAi && styles.messageTextUser]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={30} color="#000000" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Image source={LOGO_ICON} style={styles.headerLogo} resizeMode="contain" />
          <Text style={styles.headerTitle}>MindUni</Text>
        </View>
        
        {/* Espacio vacío para equilibrar el header */}
        <View style={{ width: 50 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            isTyping ? (
              <View style={[styles.messageRow, styles.messageRowLeft]}>
                <Image source={LOGO_ICON} style={styles.aiAvatar} resizeMode="contain" />
                <View style={[styles.bubble, styles.bubbleAi, { paddingVertical: 16 }]}>
                  <TypingDots />
                </View>
              </View>
            ) : null
          )}
        />

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.plusButton}>
            <Feather name="plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu mensaje..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            
            <TouchableOpacity style={styles.iconButton}>
              <Image source={MIC_ICON} style={styles.micIcon} resizeMode="contain" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Image source={SEND_ICON} style={styles.sendIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogo: {
    width: 61,
    height: 49,
  },
  headerTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 20,
    color: '#000000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  aiAvatar: {
    width: 50,
    height: 40,
    marginRight: 8,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleAi: {
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 4, // Ligero ajuste para efecto chat
  },
  bubbleUser: {
    backgroundColor: '#B898CA',
    borderTopRightRadius: 0, // Efecto chat solicitado
  },
  messageText: {
    fontFamily: 'Poppins-Regular', // Fallback si no existe, usar System
    fontSize: 14,
    color: '#000000',
  },
  messageTextUser: {
    color: '#000000', // Texto negro solicitado para usuario también
  },
  inputBar: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  plusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151', // Gris oscuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    height: 48,
    backgroundColor: '#F3F4F6', // Gris claro
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingRight: 4,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#000000',
  },
  iconButton: {
    padding: 8,
  },
  micIcon: {
    width: 20,
    height: 20,
    tintColor: '#374151',
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#B898CA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  sendIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 40,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6B7280',
  },
});
