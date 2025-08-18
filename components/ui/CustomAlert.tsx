import { useThemeColor } from '@/hooks/useThemeColor';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonText?: string;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  buttonText = 'OK'
}) => {
  const secondaryColor = useThemeColor({}, 'secondary');
  const backgroundColor = 'rgb(3, 17, 63)'; // App's background color
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <BlurView intensity={20} style={styles.blurContainer} tint="dark">
          <View style={[styles.modalView, { borderColor: secondaryColor + '80' }]}>
            <ThemedText type="heading" style={styles.modalTitle}>
              {title}
            </ThemedText>
            <ThemedText style={styles.modalMessage}>
              {message}
            </ThemedText>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: secondaryColor }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: backgroundColor }]}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 17, 63, 0.5)',
  },
  blurContainer: {
    width: width * 0.85,
    overflow: 'hidden',
    borderRadius: 20,
  },
  modalView: {
    backgroundColor: 'rgba(28, 44, 76, 0.85)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 0.5,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    opacity: 0.9,
  },
  button: {
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
}); 