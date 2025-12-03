import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// Definimos las imágenes de los avatares
// Asegúrate de que estas imágenes existan en assets/images/
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

interface AvatarSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAvatar: (avatar: ImageSourcePropType) => void;
}

export default function AvatarSelectorModal({
  visible,
  onClose,
  onSelectAvatar,
}: AvatarSelectorModalProps) {
  const panY = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;

  const resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Solo activar si el movimiento es vertical y hacia abajo
        return gestureState.dy > 0;
      },
      onPanResponderMove: Animated.event([null, { dy: panY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // Si se arrastró más de 100px hacia abajo, cerrar
          onClose();
        } else {
          // Si no, volver a la posición original
          resetPositionAnim.start();
        }
      },
    })
  ).current;

  // Resetear posición cuando se abre el modal
  useEffect(() => {
    if (visible) {
      panY.setValue(0);
    }
  }, [visible]);

  const handleSelect = (avatar: ImageSourcePropType) => {
    onSelectAvatar(avatar);
    onClose();
  };

  const renderItem = ({ item }: { item: ImageSourcePropType }) => (
    <TouchableOpacity onPress={() => handleSelect(item)} style={styles.avatarItem}>
      <Image source={item} style={styles.avatarImage} resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                transform: [{ 
                  translateY: panY.interpolate({
                    inputRange: [0, screenHeight],
                    outputRange: [0, screenHeight],
                    extrapolate: 'clamp',
                  }) 
                }] 
              }
            ]}
            onStartShouldSetResponder={() => true}
            {...panResponder.panHandlers}
          >
            {/* Botón de despliegue (Handle) */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>

            {/* Título */}
            <Text style={styles.title}>Elige tu avatar</Text>

            {/* Grid de Avatares */}
            <FlatList
              data={AVATARS}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
              numColumns={3}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false} // Deshabilitar scroll interno para evitar conflictos con el gesto
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 12,
    maxHeight: '60%', // Ocupa hasta el 60% de la pantalla
  },
  handleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  handle: {
    width: 61,
    height: 7,
    backgroundColor: '#E5E7EB',
    borderRadius: 3.5,
  },
  title: {
    fontFamily: 'Rufina-Bold',
    fontSize: 24,
    color: '#000000',
    marginBottom: 24,
    textAlign: 'left',
  },
  gridContainer: {
    alignItems: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  avatarItem: {
    marginHorizontal: 8,
  },
  avatarImage: {
    width: 85,
    height: 80,
    borderRadius: 40, // Opcional, si quieres que sean redondos visualmente
  },
});
