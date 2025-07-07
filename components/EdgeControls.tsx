import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import CustomSlider from './CustomSlider';
import ColorPicker from './ColorPicker';

interface EdgeControlsProps {
  settings: { enabled: boolean; color: string; thickness: number };
  onSettingsChange: (settings: { enabled: boolean; color: string; thickness: number }) => void;
}

export default function EdgeControls({ settings, onSettingsChange }: EdgeControlsProps) {
  const updateSetting = (key: string, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Edge Detection</Text>
      
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Enable Edge Detection</Text>
        <Switch
          value={settings.enabled}
          onValueChange={(value) => updateSetting('enabled', value)}
          trackColor={{ false: '#767577', true: '#3B82F6' }}
          thumbColor={settings.enabled ? '#FFFFFF' : '#f4f3f4'}
        />
      </View>

      {settings.enabled && (
        <View style={styles.controls}>
          <CustomSlider
            label="Edge Thickness"
            value={settings.thickness}
            onValueChange={(value) => updateSetting('thickness', value)}
            minimumValue={1}
            maximumValue={5}
            step={1}
            unit="px"
          />
          <ColorPicker
            label="Edge Color"
            color={settings.color}
            onColorChange={(color) => updateSetting('color', color)}
          />
        </View>
      )}
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
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  controls: {
    width: '100%',
  },
});