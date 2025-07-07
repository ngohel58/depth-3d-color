import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface ImageUploaderProps {
  onImageSelect: (imageUri: string) => void;
  selectedImage: string | null;
}

export default function ImageUploader({ onImageSelect, selectedImage }: ImageUploaderProps) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📤 Upload Image</Text>
      <TouchableOpacity style={styles.uploadArea} onPress={pickImage}>
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <View style={styles.overlay}>
              <Ionicons name="checkmark-circle" size={32} color="#10B981" />
              <Text style={styles.successText}>Image Loaded</Text>
              <Text style={styles.changeText}>Tap to change</Text>
            </View>
          </View>
        ) : (
          <View style={styles.uploadContent}>
            <Ionicons name="cloud-upload-outline" size={48} color="rgba(255,255,255,0.6)" />
            <Text style={styles.uploadText}>Tap to select image</Text>
            <Text style={styles.uploadSubtext}>JPG, PNG, WebP supported</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  uploadArea: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  changeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 12,
  },
  uploadSubtext: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginTop: 4,
  },
});