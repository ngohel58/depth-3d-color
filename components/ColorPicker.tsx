import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ColorPickerProps {
  label: string;
  color: string;
  onColorChange: (color: string) => void;
}

const presetColors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#FF8000', '#8000FF', '#0080FF', '#80FF00', '#FF0080', '#0040FF'
];

export default function ColorPicker({ label, color, onColorChange }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.colorRow}>
        <View style={[styles.currentColor, { backgroundColor: color }]} />
        <Text style={styles.colorValue}>{color}</Text>
      </View>
      <View style={styles.presetColors}>
        {presetColors.map((presetColor) => (
          <TouchableOpacity
            key={presetColor}
            style={[styles.presetColor, { backgroundColor: presetColor }]}
            onPress={() => onColorChange(presetColor)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentColor: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  colorValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  presetColors: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetColor: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
});