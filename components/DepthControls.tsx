import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DepthControlsProps {
  brightness: number;
  contrast: number;
  saturation: number;
  onBrightnessChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
}

function SimpleSlider({ 
  value, 
  onValueChange, 
  min = -100, 
  max = 100, 
  step = 5 
}: {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <View style={styles.sliderContainer}>
      <TouchableOpacity
        style={styles.sliderButton}
        onPress={() => onValueChange(Math.max(min, value - step))}
      >
        <Text style={styles.sliderButtonText}>-</Text>
      </TouchableOpacity>
      
      <View style={styles.sliderTrack}>
        <View 
          style={[
            styles.sliderFill,
            { width: `${((value - min) / (max - min)) * 100}%` }
          ]} 
        />
      </View>
      
      <TouchableOpacity
        style={styles.sliderButton}
        onPress={() => onValueChange(Math.min(max, value + step))}
      >
        <Text style={styles.sliderButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DepthControls({
  brightness,
  contrast,
  saturation,
  onBrightnessChange,
  onContrastChange,
  onSaturationChange,
}: DepthControlsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enhancement Controls</Text>
      
      <View style={styles.controlGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Brightness</Text>
          <Text style={styles.value}>{brightness.toFixed(0)}</Text>
        </View>
        <SimpleSlider
          value={brightness}
          onValueChange={onBrightnessChange}
          min={-100}
          max={100}
          step={5}
        />
      </View>

      <View style={styles.controlGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Contrast</Text>
          <Text style={styles.value}>{contrast.toFixed(0)}</Text>
        </View>
        <SimpleSlider
          value={contrast}
          onValueChange={onContrastChange}
          min={-100}
          max={100}
          step={5}
        />
      </View>

      <View style={styles.controlGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Saturation</Text>
          <Text style={styles.value}>{saturation.toFixed(0)}</Text>
        </View>
        <SimpleSlider
          value={saturation}
          onValueChange={onSaturationChange}
          min={-100}
          max={100}
          step={5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  title: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  controlGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    minWidth: 32,
    textAlign: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sliderButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 3,
  },
});