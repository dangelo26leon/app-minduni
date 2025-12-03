import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood: string;
}

export default function JournalScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Estado inicial con datos de ejemplo
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '1 de Diciembre, 2025',
      text: 'Hoy me sentí un poco abrumado por el examen de cálculo, pero logré terminar la guía de estudio...',
      mood: '😔',
    },
    {
      id: '2',
      date: '29 de Octubre, 2025',
      text: 'No pasó mucho hoy. Fui a clases, comí en la cafetería. Me siento un poco plano.',
      mood: '😐',
    },
  ]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [newEntryText, setNewEntryText] = useState('');
  const [selectedMood, setSelectedMood] = useState('😃');

  const MOODS = ['😃', '😌', '😐', '😔', '😠'];

  const handleSave = () => {
    if (!newEntryText.trim()) return;

    const dateOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    // Nota: En un entorno real, asegúrate de que el locale esté configurado correctamente.
    // Usamos una aproximación manual para el formato si es necesario, pero toLocaleDateString suele funcionar bien.
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('es-ES', { month: 'long' });
    const year = today.getFullYear();
    
    // Capitalizar mes
    const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);
    const formattedDate = `${day} de ${monthCapitalized}, ${year}`;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: formattedDate,
      text: newEntryText,
      mood: selectedMood,
    };

    setEntries([newEntry, ...entries]);
    setNewEntryText('');
    setSelectedMood('😃');
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: JournalEntry }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardDate}>{item.date}</Text>
        <Text style={styles.cardMood}>{item.mood}</Text>
      </View>
      <Text style={styles.cardText} numberOfLines={3}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Principal */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Diario</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <View style={styles.content}>
        {/* Botón de Acción (Hero) */}
        <TouchableOpacity 
          style={styles.heroButton} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.heroButtonText}>+ Escribir nueva entrada</Text>
        </TouchableOpacity>

        {/* Sección Entradas Anteriores */}
        <Text style={styles.sectionTitle}>Entradas Anteriores</Text>

        {/* Lista de Entradas */}
        <FlatList
          data={entries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Modal Nueva Entrada */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={[styles.modalContainer, { paddingTop: insets.top }]}>
           {/* Header del Modal */}
           <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Nueva Entrada</Text>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.modalSaveText}>Guardar</Text>
              </TouchableOpacity>
           </View>

           {/* Input de Texto */}
           <View style={styles.modalBody}>
             <TextInput
                style={styles.textInput}
                placeholder="¿Cómo te sientes hoy?"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                value={newEntryText}
                onChangeText={setNewEntryText}
                autoFocus
             />

             {/* Selector de Estado de Ánimo */}
             <View style={styles.moodSection}>
               <Text style={styles.moodTitle}>¿Cómo te sientes?</Text>
               <View style={styles.moodList}>
                 {MOODS.map((mood) => (
                   <TouchableOpacity
                     key={mood}
                     onPress={() => setSelectedMood(mood)}
                     style={[
                       styles.moodItem,
                       selectedMood === mood && styles.moodItemActive
                     ]}
                     activeOpacity={0.7}
                   >
                     <Text style={[
                       styles.moodEmoji,
                       selectedMood === mood && styles.moodEmojiActive
                     ]}>
                       {mood}
                     </Text>
                   </TouchableOpacity>
                 ))}
               </View>
             </View>
           </View>
        </View>
      </Modal>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  heroButton: {
    backgroundColor: '#B898CA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
    shadowColor: "#B898CA",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  heroButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 16,
    color: '#000000',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardDate: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#B898CA',
  },
  cardMood: {
    fontSize: 16,
  },
  cardText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  // Estilos del Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalCancelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#B898CA',
  },
  modalTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 18,
    color: '#000000',
  },
  modalSaveText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#B898CA',
  },
  modalBody: {
    flex: 1,
    padding: 20,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1F2937',
  },
  moodSection: {
    marginTop: 20,
  },
  moodTitle: {
    fontFamily: 'Rufina-Bold',
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 12,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  moodItem: {
    padding: 8,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodItemActive: {
    backgroundColor: '#E9D5FF', // Lila suave
    transform: [{ scale: 1.2 }],
  },
  moodEmoji: {
    fontSize: 28,
    opacity: 0.5,
  },
  moodEmojiActive: {
    opacity: 1.0,
  },
});

// End of file