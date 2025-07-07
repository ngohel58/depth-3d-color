import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface EnhancementSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  sharpness: number;
  gamma: number;
}

interface EnhancementControlsProps {
  settings: EnhancementSettings;
  onSettingsChange: (settings: EnhancementSettings) => void;
}

export default function EnhancementControls({ settings, onSettingsChange }: EnhancementControlsProps) {
  const updateSetting = (key: keyof EnhancementSettings, value: number) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const ControlSlider = ({ label, value, min, max, step, onChange }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
  }) => (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderLabel}>{label}</Text>
        <Text style={styles.sliderValue}>{value.toFixed(2)}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#3B82F6"
        maximumTrackTintColor="#CBD5E1"
        thumbStyle={styles.thumb}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Image Enhancement</Text>
      
      <ControlSlider
        label="Brightness"
        value={settings.brightness}
        min={-1}
        max={1}
        step={0.01}
        onChange={(value) => updateSetting('brightness', value)}
      />
      
      <ControlSlider
        label="Contrast"
        value={settings.contrast}
        min={0}
        max={2}
        step={0.01}
        onChange={(value) => updateSetting('contrast', value)}
      />
      
      <ControlSlider
        label="Saturation"
        value={settings.saturation}
        min={0}
        max={2}
        step={0.01}
        onChange={(value) => updateSetting('saturation', value)}
      />
      
      <ControlSlider
        label="Sharpness"
        value={settings.sharpness}
        min={0}
        max={2}
        step={0.01}
        onChange={(value) => updateSetting('sharpness', value)}
      />
      
      <ControlSlider
        label="Gamma"
        value={settings.gamma}
        min={0.1}
        max={3}
        step={0.01}
        onChange={(value) => updateSetting('gamma', value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#475569',
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    backgroundColor: 'rgba(59,130,246,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  thumb: {
    backgroundColor: '#3B82F6',
    width: 20,
    height: 20,
  },
});