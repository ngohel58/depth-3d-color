import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface CustomSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  unit?: string;
}

export default function CustomSlider({
  label,
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  unit = ''
}: CustomSliderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{Math.round(value)}{unit}</Text>
      </View>
      <Slider
        style={styles.slider}
        value={value}
        onValueChange={onValueChange}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="rgba(255,255,255,0.3)"
        thumbTintColor="#007AFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    backgroundColor: 'rgba(0,122,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    minWidth: 50,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});