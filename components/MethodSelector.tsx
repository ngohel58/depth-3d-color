import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MethodSelectorProps {
  onMethodSelect: (method: string) => void;
  selectedMethod: string;
}

const methods = [
  { value: '', label: 'Select AI Model...' },
  { value: 'depth-anything-v2', label: 'Depth Anything V2 (SOTA 2024)' },
  { value: 'midas', label: 'MiDaS 3.1 (Robust & Fast)' },
  { value: 'marigold', label: 'Marigold (Diffusion-based)' },
  { value: 'tfjs-depth', label: 'TensorFlow.js Portrait Depth' },
  { value: 'depth-pro', label: 'Depth Pro (Apple - Metric)' },
];

export default function MethodSelector({ onMethodSelect, selectedMethod }: MethodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Depth Estimation Method</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMethod}
          onValueChange={onMethodSelect}
          style={styles.picker}
          dropdownIconColor="#FFFFFF"
        >
          {methods.map((method) => (
            <Picker.Item
              key={method.value}
              label={method.label}
              value={method.value}
              color="#FFFFFF"
            />
          ))}
        </Picker>
      </View>
      {selectedMethod && (
        <View style={styles.methodInfo}>
          <Text style={styles.infoText}>
            {getMethodDescription(selectedMethod)}
          </Text>
        </View>
      )}
    </View>
  );
}

function getMethodDescription(method: string): string {
  const descriptions = {
    'depth-anything-v2': 'State-of-the-art foundation model with excellent performance on diverse scenes.',
    'midas': 'Robust monocular depth estimation with multi-objective optimization.',
    'marigold': 'Diffusion-based approach with high accuracy using Stable Diffusion backbone.',
    'tfjs-depth': 'Optimized for human portraits using MediaPipe segmentation.',
    'depth-pro': 'Apple\'s fast metric depth estimation producing 2.25MP depth maps.',
  };
  return descriptions[method as keyof typeof descriptions] || '';
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
  pickerContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#FFFFFF',
  },
  methodInfo: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'rgba(59,130,246,0.2)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.3)',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});