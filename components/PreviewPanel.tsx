import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

interface PreviewPanelProps {
  originalImage: string | null;
  depthMap: string | null;
  coloredImage: string | null;
}

const { width } = Dimensions.get('window');
const imageSize = width - 60; // Large single preview

export default function PreviewPanel({ originalImage, depthMap, coloredImage }: PreviewPanelProps) {
  const [selectedPreview, setSelectedPreview] = useState<'original' | 'depth' | 'colored'>('original');

  const getSelectedImage = () => {
    switch (selectedPreview) {
      case 'original': return originalImage;
      case 'depth': return depthMap;
      case 'colored': return coloredImage;
      default: return originalImage;
    }
  };

  const getPlaceholderText = () => {
    switch (selectedPreview) {
      case 'original': return 'Upload image';
      case 'depth': return 'Generate depth map';
      case 'colored': return 'Apply colors';
      default: return 'No preview';
    }
  };

  const getAdaptiveTextColor = (bgColor: string) => {
    // Simple contrast calculation - in real app, you'd use more sophisticated logic
    return '#1E293B'; // Dark text for better readability on light backgrounds
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: getAdaptiveTextColor('#F8FAFC') }]}>👁️ Live Preview</Text>
      
      {/* Preview Mode Selector */}
      <View style={styles.selectorContainer}>
        {[
          { key: 'original', label: 'Original' },
          { key: 'depth', label: 'Depth Map' },
          { key: 'colored', label: 'Color Preview' }
        ].map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.selectorButton,
              selectedPreview === option.key && styles.selectedButton
            ]}
            onPress={() => setSelectedPreview(option.key as any)}
          >
            <Text style={[
              styles.selectorText,
              { color: getAdaptiveTextColor('#F8FAFC') },
              selectedPreview === option.key && styles.selectedText
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Large Preview */}
      <View style={[styles.imageContainer, { width: imageSize, height: imageSize * 0.75 }]}>
        {getSelectedImage() ? (
          <Image source={{ uri: getSelectedImage()! }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={[styles.placeholderText, { color: getAdaptiveTextColor('#F8FAFC') }]}>
              {getPlaceholderText()}
            </Text>
          </View>
        )}
      </View>
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
    marginBottom: 16,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  selectedButton: {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedText: {
    color: '#1E293B',
    fontWeight: '600',
  },
  imageContainer: {
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
});